const pool = require("./pool");

async function getCategories(){
    try{
    const { rows } = await pool.query(
        `SELECT * FROM categories
         ORDER BY id;`);
        if(rows.length === 0){
        return null;
    }
    return rows;
    } catch (error) {
           console.error("Database error:", error);
           return null;
    }
}

async function getCategory(categoryId){
        try{
    const { rows } = await pool.query(
        `SELECT * FROM categories
        WHERE id = $1;`,
        [categoryId]
    );
        if(rows.length === 0){
        return null;
    }
    return rows[0];
    } catch (error) {
           console.error("Database error:", error);
           return null;
    }
}


async function createCategory(category){
    const result =  await pool.query(
        `INSERT INTO categories (name)
        VALUES ($1)`,[category]);

    return result;
}

async function updateCategory(id, name) {
  try {
    const { rows } = await pool.query(
      `UPDATE categories
       SET name = $2
       WHERE id = $1
       RETURNING *;`,
      [id, name]
    );

    // If no rows were updated, the category ID didn’t exist
    if (rows.length === 0) {
      return null;
    }

    // Return the updated category object
    return rows[0];
  } catch (error) {
    console.error("Database error in updateCategory:", error);
    throw error; // let the controller handle the error
  }
}

async function deleteCategory(id){
    try{
        const { rows } = await pool.query(
            `DELETE FROM categories
            WHERE id = $1
            RETURNING *;`,
            [id]
        );
        return rows[0] || null;
    } catch (error){
            console.error("Database error in updateCategory:", error);
            throw error;
    }
}


module.exports = {
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory,
    getCategory
    
}