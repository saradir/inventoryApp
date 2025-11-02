const pool = require("./pool");

async function getCategories(){
    try{
    const { rows } = await pool.query("SELECT * FROM category");
        if(rows.length === 0){
        return null;
    }
    return rows;
    } catch (error) {
           console.error("Database error:", error);
           return null;
    }
}

module.exports = {
    getCategories,
}