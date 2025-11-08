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

// pulls items along with brand and category name
async function getItemsByCategory(categoryId){
    try{
        const { rows } = await pool.query(
        `SELECT i.*, b.name AS brand_name, c.name AS category_name
        FROM items i
        LEFT JOIN brands b ON i.brand_id = b.id
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

async function getBrandsByCategory(categoryId){
    try{
        const { rows } = await pool.query(
            `SELECT b.*, c.name AS category_name
            FROM brands b
            JOIN brand_categories bc ON b.id = bc.brand_id
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
    getCategories,
    getItemsByCategory,
    getBrandsByCategory,
    createCategory,
    getBrands,
    createBrand,
    

}