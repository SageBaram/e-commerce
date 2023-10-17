const mongoose = require("mongoose");
const Product = require("@models/productModel");

// GET CONTROLLERS
const readProduct = async (req, res) => {
	const productId = req.params.productId;

	try {
		const product = await Product.findById(productId);
		return product
			? res.status(200).json({ product })
			: res.status(404).json({ message: "Product not found" });
	} catch (error) {
		return res.status(500).json({ error });
	}
};

const readAllProducts = async (_, res) => {
	try {
		const products = await Product.find({});
		return res.status(200).json({ products });
	} catch (error) {
		return res.status(500).json({ error });
	}
};

// POST CONTROLLERS
const createProduct = async (req, res) => {
	const { name, brand, category, description, image, price, countInStock } =
		req.body;

	const product = new Product({
		_id: new mongoose.Types.ObjectId(),
		name: name,
		brand: brand,
		category: category,
		description: description,
		image: image,
		price: price,
		countInStock: countInStock,
	});

	try {
		await product.save();
		return res.status(201).json({ product });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: "An error occurred" });
	}
};

// PATCH CONTROLLERS
const updateProduct = async (req, res) => {
  const productId = req.params.productId;
  try {
    // Finding the product by id
    const product = await Product.findById(productId);
    if (product) {
      try {
        // Update the product with the request body data
        product.set(req.body);
        await product.save();
        // Respond with a success status and the updated product
        return res.status(200).json({ product });
      } catch (error) {
        // Handle save error
        res.status(500).json({ error: "Error updating the product" });
      }
    } else {
      // Product not found
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    // Handle find error
    res.status(500).json({ error: "Internal server error" });
  }
};

// DELETE CONTROLLERS
const deleteProduct = async (req, res) => {
	const productId = req.params.productId;

	try {
		await Product.findByIdAndDelete(productId);
		return res.status(201).json({
			message: `${productId} Deleted from database!`,
		});
	} catch (error) {
		return res.status(500).json({ message: "Product not found" });
	}
};

module.exports = {
	createProduct,
	readProduct,
	readAllProducts,
	updateProduct,
	deleteProduct,
};
