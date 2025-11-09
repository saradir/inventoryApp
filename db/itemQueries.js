const pool = require("./pool");

async function getItems(){
    try{
        const { rows } = await pool.query(
        `SELECT i.*, b.name AS brand_name, c.name AS category_name
        FROM items i
        LEFT JOIN brands b ON i.brand_id = b.id
        LEFT JOIN categories c ON i.category_id = c.id;`
        );
        if (rows.length === 0){
            return null;
        }
        return rows;
    } catch (error){
        console.error("Database error:", error);
        return null;
    }
}

async function createItem(item, category, brand){
   const result = await pool.query(
    `INSERT INTO items (name, category_id, brand_id)
    VALUES ($1, $2, $3)`, [item, category, brand]
   );

   return result;
}

async function getItem(itemId){
    const result = await pool.query(
        `SELECT * FROM items
        WHERE id = $1`,[itemId]
    );
    return result;
}

module.exports = {
    getItems,
    createItem,
    getItem

}