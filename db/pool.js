console.log('DATABASE_URL:', process.env.DATABASE_URL);

const { Pool } = require('pg');

module.exports = new Pool ({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.DATABASE_SSL === 'true' ? {rejectUnauthorized:false}: false,
    });