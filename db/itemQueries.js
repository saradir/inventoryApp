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

async function deleteItem(id){
    try{
        const { rows } = await pool.query(
            `DELETE FROM items
            WHERE id = $1
            RETURNING *;`,
            [id]
        );
        return rows[0] || null;
    } catch (error){
            console.error("Database error in deleteItem:", error);
            throw error;
    }
}

async function updateItem(itemId, itemData) {
  try {
    // Get object keys and values, ignoring undefined fields
    const entries = Object.entries(itemData).filter(([_, v]) => v !== undefined);

    // Build dynamic SQL placeholders: $2, $3, ...
    const setClauses = entries.map(([key], i) => `${key} = $${i + 2}`).join(", ");

    const values = [itemId, ...entries.map(([_, value]) => value)];

    const { rows } = await pool.query(
      `UPDATE items
       SET ${setClauses}
       WHERE id = $1
       RETURNING *;`,
      values
    );

    return rows[0] || null;
  } catch (error) {
    console.error("Database error in updateItem:", error);
    throw error;
  }
}


module.exports = {
    getItems,
    createItem,
    getItem,
    deleteItem,
    updateItem
}