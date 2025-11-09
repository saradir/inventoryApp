const express = require('express');
const router = express.Router();
const itemController = require("../controllers/itemController.js");


router.get("/", itemController.getItems);
router.get("/new", itemController.createItemGET);
router.post("/new", itemController.createItemPOST);
router.get("/:itemId", itemController.getItem);




module.exports = router;


