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

    CREATE TABLE IF NOT EXISTS brand_categories (
    brand_id INTEGER REFERENCES brands(id) ON DELETE CASCADE,
    category_id INTEGER REFERENCES categories(id) ON DELETE CASCADE,
    PRIMARY KEY (brand_id, category_id)
    );

`;

async function main(){
    console.log("seeding...");
    const client = new Client({
    connectionString: process.env.DATABASE_URL
    });
    await client.connect();
    await client.query(SQL);
    await client.end();
    console.log("done");
}

    
main();
