#! /usr/bin/env node

const { Client } = require("pg");
const { connectionString } = require("pg/lib/defaults");

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
