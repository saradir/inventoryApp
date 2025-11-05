const express = require('express');
const router = express.Router();
const categoryController = require("../controllers/categoryController.js");
const itemController = require("../controllers/itemController.js");

router.get("/", categoryController.getCategories );
router.get("/new", categoryController.createCategoryGET);
router.post("/new", categoryController.createCategoryPOST);
router.get("/:id/items", itemController.getItemsByCategory);

module.exports = router;