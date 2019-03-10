const { Client } = require("pg");

const client = new Client({
  connectionString: "postgresql:///DB_NAME"
});

client.connect();

module.exports = client;