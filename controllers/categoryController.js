const db = require("../db/queries");


async function getCategories(req, res){
    const categories = await db.getCategories();
    if(!categories){
        throw new Error('No categories found');
    }
    res.render('index', {title: "Categories", categories: categories});
}

module.exports = {
    getCategories,

}