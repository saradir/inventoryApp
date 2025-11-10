const express = require('express');
const router = express.Router();
const brandController = require("../controllers/brandController.js");


router.get("/", brandController.getBrands);
router.get("/new", brandController.createBrandGET);
router.post("/new", brandController.createBrandPOST);
router.get("/:id/edit", brandController.updateBrandGET);
router.post("/:id/edit", brandController.updateBrandPOST);
router.post("/:id/delete", brandController.deleteBrand);


module.exports = router;