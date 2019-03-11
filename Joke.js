// MODEL
// exports Model
const axios = require("axios");
const db = require("./db");
const BASE_URL = "https://icanhazdadjoke.com/";

class Joke {
  static async getRandomJokes(num=20) {
    const seenJokeIds = new Set();
    const jokeData = [];
    while (jokeData.length < num) {
      // not the most optimal
      // would be good to refactor so that these requests
      // don't happen in sequence
      const newJokeRes = await axios.get(BASE_URL, {
        headers: {
          Accept: "application/json"
        }
      });
      const newJokeData = newJokeRes.data; // { id, joke, status }
      if (!seenJokeIds.has(newJokeData.id)) {
        seenJokeIds.add(newJokeData.id)
        jokeData.push(await Joke.getOrInsert(newJokeData));
      }
    }
    return jokeData;
  }

  static async getOrInsert({ id, joke }) {
    try {
      const existingJoke = await db.query(`
        SELECT * FROM jokes WHERE id=$1
      `, [id]);
      if (existingJoke.rows.length > 0) return existingJoke.rows[0];
      const newJoke = await db.query(`
        INSERT INTO jokes (id, joke) VALUES ($1, $2) RETURNING *;
      `, [id, joke]);
      return newJoke.rows[0];
    } catch (e) {
      throw new Error("oops", e)
    }
  }

  static async getTopJokes(num=5) {
    try {
      const topJokes = await db.query(`
        SELECT * FROM jokes ORDER BY votes DESC LIMIT $1
      `, [num]);
      return topJokes.rows;
    } catch (e) {
      throw new Error("oops", e)
    }
  }

  static async getBottomJokes(num=5) {
    try {
      const bottomJokes = await db.query(`
        SELECT * FROM jokes ORDER BY votes ASC LIMIT $1
      `, [num]);
      return bottomJokes.rows;
    } catch (e) {
      throw new Error("oops", e)
    }
  }
}

module.exports = Joke