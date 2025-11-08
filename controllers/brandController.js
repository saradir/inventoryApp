const db = require('../db/queries');


async function getBrands(req, res){
    const brands = await db.getBrands();
    if(!brands){
        throw new Error('No Brands Found');
    }
    res.render('brands', {
        title: 'Brands',
        brands: brands
    });
}

async function createBrandGET(req, res){
    res.render('newBrandForm', {title: 'Add Brand'});
}

async function createBrandPOST(req, res){
    try{
        const result = await db.createBrand(req.body.brand);
        if(result.rowCount <= 0){
            throw new Error('Error: No Brand Created');
        }
        res.redirect('/brands');
    } catch (error){
        console.log(`Server Error:`, error);
    }
}

module.exports = {
    getBrands,
    createBrandGET,
    createBrandPOST
}