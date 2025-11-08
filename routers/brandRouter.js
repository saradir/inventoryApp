const express = require('express');
const router = express.Router();
const brandController = require("../controllers/brandController.js");


router.get("/", brandController.getBrands);
router.get("/new", brandController.createBrandGET);
router.post("/new", brandController.createBrandPOST);

module.exports = router;