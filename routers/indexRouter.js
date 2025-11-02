const express = require('express');
const router = express.Router();
const categoryController = require("../controllers/categoryController.js");
const itemRouter = require("./itemRouter.js");

router.get('/categories', categoryController.getCategories);
// router.use('categories/:id/items', itemRouter);

module.exports = router;