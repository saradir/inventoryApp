const express = require('express');
const router = express.Router();
const itemController = require("../controllers/itemController.js");


router.get("/", itemController.getItems);
router.get("/new", itemController.createItemGET);
router.post("/new", itemController.createItemPOST);
router.get("/:itemId", itemController.getItem);
router.get("/:id/edit", itemController.updateItemGET);
router.post("/:id/edit", itemController.updateItemPOST);
router.post("/:id/delete", itemController.deleteItem);



module.exports = router;


