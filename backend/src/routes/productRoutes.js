const express = require("express");
const controller = require("@controllers/productController");

const router = express.Router();

router.post("/create/", controller.createProduct);
router.get("/get/:productId", controller.readProduct);
router.get("/get/", controller.readAllProducts);
router.patch("/update/:productId", controller.updateProduct);
router.delete("/delete/:productId", controller.deleteProduct);

module.exports = router;
