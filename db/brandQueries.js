const pool = require("./pool");

async function getBrands(){
    try{
        const { rows } = await pool.query(`SELECT * FROM brands ORDER BY id;`);
        if(rows.length === 0) return null;
        return rows;
    } catch (error) {
        console.log("Database Error:", error);
        return null;
    }
}

async function getBrand(brandId){
  try{
    const { rows } = await pool.query(
      `SELECT * FROM brands
      WHERE id= $1`,
      [brandId]
    );
    if(rows.length === 0) return null;
    return rows[0];
  }catch (error) {
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

async function updateBrand(id, name) {
  try {
    const { rows } = await pool.query(
      `UPDATE brands
       SET name = $2
       WHERE id = $1
       RETURNING *;`,
      [id, name]
    );

    // If no rows were updated, the brand ID didn’t exist
    if (rows.length === 0) {
      return null;
    }

    // Return the updated brand object
    return rows[0];
  } catch (error) {
    console.error("Database error in updateBrand:", error);
    throw error; // let the controller handle the error
  }
}

async function deleteBrand(id){
    try{
        const { rows } = await pool.query(
            `DELETE FROM brands
            WHERE id = $1
            RETURNING *;`,
            [id]
        );
        return rows[0] || null;
    } catch (error){
            console.error("Database error in updateBrand:", error);
            throw error;
    }
}

module.exports = {
    getBrands,
    createBrand, 
    updateBrand,
    deleteBrand,
    getBrand
}