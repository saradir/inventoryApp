const db = require("../db/itemQueries");
const { getBrands } = require("../db/brandQueries");
const { getCategories} = require("../db/categoryQueries");
async function getItemsByCategory(category){
    return true;
}

async function getItems(req, res){
    const items = await db.getItems();
    //if (!items){
        //throw new Error('No Items Found');

 //   }
    res.render('items', {
        title: 'Items',
        items
    });
}

async function createItemGET(req, res){
    const [categories, brands] = await Promise.all([getCategories(), getBrands()]);
    res.render('newItemForm.ejs', {title: 'New Item', categories, brands});
}

async function createItemPOST(req, res){
    try{
        const result = await db.createItem(req.body.item, req.body.category_id, req.body.brand_id);
        if (result.rowCount <= 0){
            throw new Error('Operation failed: Item not created');
        }
        res.redirect('/items/');
    } catch (error){
        console.log('Database Error:', error);
    }
}

async function getItem(req,res){
    const itemId = req.params.id;
    const result = await db.getItem(itemId);
    if (result.rowCount <= 0){
        throw new Error('No Item Found');
    }
    res.render('itemPage', {
        title: result.rows[0].name,
        item: result.rows[0]
    })
}


async function updateItemGET(req, res){
    return true;
}

async function updateItemPOST(req, res){
    return true;
}

async function deleteItem(req, res){
    return true;
}

module.exports = {
    getItemsByCategory,
    getItems,
    createItemGET,
    createItemPOST,
    getItem,
    updateItemGET,
    updateItemPOST,
    deleteItem
}