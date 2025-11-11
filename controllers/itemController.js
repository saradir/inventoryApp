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
    if (!result){
        throw new Error('No Item Found');
    }
    res.render('itemPage', {
        title: result.rows[0].name,
        item: result.rows[0]
    })
}


async function updateItemGET(req, res){
    const [categories, brands, item] = await Promise.all([getCategories(), getBrands(), db.getItem(req.params.id)]);
    console.log(item);
    res.render("updateItemForm", {title: "Edit Item", item, brands, categories})
}

async function updateItemPOST(req, res){
    try{
    const result = await db.updateItem(req.params.id, req.body);
    if(!result) throw new Error('Update Operation Failed');
    res.redirect('/items/');
        } catch (error){
            console.log(`Server Error:`, error);
        }
}


async function deleteItem(req, res){
    await db.deleteItem(req.params.id);
    res.redirect('/items/');    
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