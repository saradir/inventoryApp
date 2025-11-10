const db = require('../db/brandQueries');


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
        res.redirect('/brands/');
    } catch (error){
        console.log(`Server Error:`, error);
    }
}

async function updateBrandGET(req, res){
    const brand = await db.getBrand(req.params.id);
    res.render('updateBrandForm', {title: 'Edit Brand', brand });
}

async function updateBrandPOST(req, res){
    try{
        const result = await db.updateBrand(req.params.id, req.body.name);
        if(!result) throw new Error('Update Operation Failed');
        res.redirect('/brands/');
    } catch (error){
        console.log(`Server Error:`, error);
    }
}

async function deleteBrand(req, res){
    await db.deleteBrand(req.params.id);
    res.redirect('/brands');    
}

module.exports = {
    getBrands,
    createBrandGET,
    createBrandPOST,
    updateBrandGET,
    updateBrandPOST,
    deleteBrand
}