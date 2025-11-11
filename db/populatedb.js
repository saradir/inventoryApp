#! /usr/bin/env node
require("dotenv").config();
const { Client } = require("pg");

const SQL = `
CREATE TABLE IF NOT EXISTS categories(
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name TEXT UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS brands(
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name TEXT UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS items(
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name TEXT UNIQUE NOT NULL,
  category_id INTEGER REFERENCES categories(id),
  brand_id INTEGER REFERENCES brands(id),
  quantity INTEGER
);

CREATE TABLE IF NOT EXISTS brand_categories(
  brand_id INTEGER REFERENCES brands(id) ON DELETE CASCADE,
  category_id INTEGER REFERENCES categories(id) ON DELETE CASCADE,
  PRIMARY KEY (brand_id, category_id)
);

-- Clear existing data
TRUNCATE items, brand_categories, categories, brands RESTART IDENTITY CASCADE;

-- Categories
INSERT INTO categories (name) VALUES
('Guitars'),
('Basses'),
('Keyboards'),
('Drums'),
('Brass'),
('Woodwinds'),
('Percussion'),
('Orchestral Strings'),
('Amps & Effects'),
('Accessories');

-- Brands
INSERT INTO brands (name) VALUES
('Fender'),
('Gibson'),
('Yamaha'),
('Roland'),
('Korg'),
('Pearl'),
('Ibanez'),
('Selmer'),
('Boss'),
('DAddario');  -- replaced fancy apostrophe

-- Items
INSERT INTO items (name, category_id, brand_id, quantity) VALUES
('Stratocaster Electric Guitar', 1, 1, 5),
('Les Paul Standard', 1, 2, 3),
('Precision Bass', 2, 1, 4),
('Yamaha Stage Custom Drum Kit', 4, 3, 2),
('Roland TD-27KV V-Drums', 4, 4, 1),
('Korg Kronos Workstation', 3, 5, 2),
('Ibanez RG550', 1, 7, 4),
('Selmer Paris Alto Saxophone', 6, 8, 2),
('Boss Katana 100 Amp', 9, 9, 6),
('DAddario EXL110 Guitar Strings', 10, 10, 25);

-- Brand-Category relationships
INSERT INTO brand_categories (brand_id, category_id) VALUES
(1, 1),
(1, 2),
(2, 1),
(3, 3),
(3, 4),
(4, 4),
(5, 3),
(6, 4),
(7, 1),
(8, 6),
(9, 9),
(10, 10);
`;

async function main() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    console.log("Seeding database...");
    await client.connect();
    await client.query(SQL);
    console.log("Done!");
  } catch (err) {
    console.error("Error seeding database:", err);
  } finally {
    await client.end();
  }
}

main();
