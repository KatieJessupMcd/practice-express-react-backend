// ROUTES
// starts server, route handlers that use class methods defined in MODEL
const express = require('express'); 
const cors = require('cors'); 
const app = express();
const Pokemon = require('./Pokemon'); 
app.use(cors());
app.use(express.json());

app.get("/pokemon", async function(req, res, next) {
  try {
    const pokemonList = await Pokemon.getPokemon();
    return res.json({ pokemonList });
  } catch (e) {
    return next(e);
  }
});


app.listen(3001, () => console.log("Server started on 3001"));