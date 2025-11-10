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

// pulls items along with category and category name
async function getItemsByCategory(categoryId){
    try{
        const { rows } = await pool.query(
        `SELECT i.*, b.name AS category_name, c.name AS category_name
        FROM items i
        LEFT JOIN categorys b ON i.category_id = b.id
        JOIN categories c ON i.category_id = c.id
        WHERE c.id = $1;`,
        [categoryId]
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

async function getcategorysByCategory(categoryId){
    try{
        const { rows } = await pool.query(
            `SELECT b.*, c.name AS category_name
            FROM categorys b
            JOIN category_categories bc ON b.id = bc.category_id
            JOIN categories c ON bc.category_id = c.id
            WHERE c.id = $1;
            `,[categoryId]
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