const mongoose = require("mongoose");
const Product = require("@models/productModel");

// GET CONTROLLERS
const readProduct = async (req, res, next) => {
	const productId = req.params.productId;

	try {
		const product = await Product.findById(productId);
		if (product) {
			return res.status(200).json({ product });
		} else next({ statusCode: 404, message: "Product not found" });
	} catch (error) {
		next(error);
	}
};

const readAllProducts = async (_, res, next) => {
	try {
		const products = await Product.find({});
		return res.status(200).json({ products });
	} catch (error) {
		next(error);
	}
};

// POST CONTROLLERS
const createProduct = async (req, res, next) => {
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
		console.log("Controller method catch block called");
		next(error);
	}
};

// PATCH CONTROLLERS
const updateProduct = async (req, res, next) => {
	const productId = req.params.productId;
	try {
		const product = await Product.findById(productId);
		if (!product) {
			next({ statusCode: 404, message: "Product not found" });
		}
		product.set(req.body);
		await product.save();
		return res.status(200).json({ product });
	} catch (error) {
		next(error);
	}
};

// DELETE CONTROLLERS
const deleteProduct = async (req, res, next) => {
	const productId = req.params.productId;

	try {
		await Product.findByIdAndDelete(productId);
		return res.status(200).json({
			message: `${productId} Deleted from database!`,
		});
	} catch (error) {
		next({ statusCode: 404, message: "Product not found" });
	}
};

module.exports = {
	createProduct,
	readProduct,
	readAllProducts,
	updateProduct,
	deleteProduct,
};
