// MODEL
// exports Model
const axios = require("axios");
const db = require("./db");
const BASE_URL = "https://pokeapi.co/api/v2/pokemon/";

class Pokemon {
  static async getPokemon(){
    let newPokemonRes = await axios.get(BASE_URL);
    let newPokemonData = newPokemonRes.data.results; 
    return newPokemonData; 
  }
  

  // static async insert({ id, joke }) {
  //   try {

  //     const newJoke = await db.query(`
  //       INSERT INTO jokes (id, joke) VALUES ($1, $2) RETURNING *;
  //     `, [id, joke]);
  //     return newJoke.rows[0];
  //   } catch (e) {
  //     throw new Error("oops", e)
  //   }
  // }

  
}

module.exports = Pokemon