const express = require('express');
const router = express.Router();
const brandController = require("../controllers/brandController.js");


router.get("/", brandController.getBrands);
router

module.exports = router;