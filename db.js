const { Client } = require("pg");

const client = new Client({
  connectionString: "postgresql:///pokemon_db"
});

client.connect();

module.exports = client;