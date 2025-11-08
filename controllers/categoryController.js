const db = require("../db/categoryQueries.js");


async function getCategories(req, res){
    const categories = await db.getCategories();
    if(!categories){
        throw new Error('No categories found');
    }
    res.render('categories', {title: "Categories", categories: categories});
}

async function createCategoryPOST(req, res){
    try {
        const result = await db.createCategory(req.body.category);
        if(result.rowCount <= 0){
            throw new Error('Operation failed: no category created');
        }
         res.redirect('/categories');

    } catch (error) {
        console.log('Database Error:',error);
    }
}

async function createCategoryGET(req, res){
    res.render('newCategoryForm', {title: 'Add Category'});
}



module.exports = {
    getCategories,
    createCategoryPOST,
    createCategoryGET,
    

}