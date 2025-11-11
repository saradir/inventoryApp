const express = require('express');
const router = express.Router();
const categoryController = require("../controllers/categoryController.js");
const itemController = require("../controllers/itemController.js");

router.get("/", categoryController.getCategories );
router.get("/new", categoryController.createCategoryGET);
router.post("/new", categoryController.createCategoryPOST);
//router.get("/:id/items", itemController.getItemsByCategory);
router.get("/:id/edit", categoryController.updateCategoryGET);
router.post("/:id/edit", categoryController.updateCategoryPOST);
router.post("/:id/delete", categoryController.deleteCategory);

module.exports = router;