const pool = require("./pool");

async function getBrands(){
    try{
        const { rows } = await pool.query(`SELECT * FROM brands;`);
        if(rows.length === 0) return null;
        return rows;
    } catch (error) {
        console.log("Database Error:", error);
        return null;
    }
}

async function createBrand(brand){
    const result = await pool.query(
        `INSERT INTO brands (name)
        VALUES ($1)`, [brand]);
    return result;
}

module.exports = {
    getBrands,
    createBrand
}