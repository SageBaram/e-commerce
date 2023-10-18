const express = require("express");
const controller = require("@controllers/productController");

const router = express.Router();

router.post("/", controller.createProduct);
router.get("/:productId", controller.readProduct);
router.get("/", controller.readAllProducts);
router.patch("/:productId", controller.updateProduct);
router.delete("/:productId", controller.deleteProduct);

module.exports = router;
