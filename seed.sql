DROP DATABASE if exists pokemon_db;
CREATE DATABASE pokemon_db;

\c pokemon_db

CREATE TABLE pokemon(
  id TEXT PRIMARY KEY,
  pokemon_name TEXT NOT NULL
);