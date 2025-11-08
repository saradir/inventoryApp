const db = require("../db/itemQueries");


async function getItemsByCategory(category){
    return true;
}

async function getItems(){
    const { rows } = await db.query(
        `SELECT * FROM items;`
    )
}


module.exports = {
    getItemsByCategory,

}