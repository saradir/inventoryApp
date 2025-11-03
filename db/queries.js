const pool = require("./pool");

async function getCategories(){
    try{
    const { rows } = await pool.query("SELECT * FROM categories;");
        if(rows.length === 0){
        return null;
    }
    return rows;
    } catch (error) {
           console.error("Database error:", error);
           return null;
    }
}

async function getItemsByCategory(categoryId){
    try{
        const { rows } = await pool.query("SELECT * FROM items WHERE category = $1",[categoryId]);
        if (rows.length === 0){
            return null;
        }
        return rows;
    } catch (error){
        console.error("Database error:", error);
        return null;
    }
}

module.exports = {
    getCategories,
    getItemsByCategory,
}