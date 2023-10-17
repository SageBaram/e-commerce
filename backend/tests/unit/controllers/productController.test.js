const request = require("supertest");
const express = require("express");
const app = require("@app/app");
const Product = require("@models/productModel");

app.use("/api/products", require("@routes/productRoutes"));

const mockProduct = {
	_id: "Sample Id",
	name: "Sample Product",
	brand: "Sample Brand",
	category: "Sample Category",
	description: "Sample Description",
	image: "Image Sample",
	price: 100,
	countInStock: 10,
};

// Product Controller Tests
describe("Product Controller", () => {
	let saveMock;
	let findMock;
	let findByIdMock;
	let findOneAndDeleteMock;
	// Reset all mocks before each test
	beforeEach(() => {
		saveMock = jest.spyOn(Product.prototype, "save");
		findMock = jest.spyOn(Product, "find");
		findByIdMock = jest.spyOn(Product, "findById");
		findOneAndDeleteMock = jest.spyOn(Product, "findOneAndDelete");

		// Reset the mock implementations and clear any previous mock calls
		saveMock.mockReset();
		findMock.mockReset();
		findByIdMock.mockReset();
		findOneAndDeleteMock.mockReset();
	});

	// Test for createProduct
	it("should create a new product", async () => {
		// Mock the behavior of the Product.save method
		saveMock.mockResolvedValue(mockProduct);

		const newProduct = {
			name: "Sample Product",
			brand: "Sample Brand",
			category: "Sample Category",
			description: "Sample Description",
			image: "Image Sample",
			price: 100,
			countInStock: 10,
		};

		const res = await request(app)
			.post("/api/products/create")
			.send(newProduct);

		expect(res.statusCode).toEqual(201);
		expect(res.body).toHaveProperty("product");

		expect(saveMock).toHaveBeenCalled();
	});

	// Test for readAllProducts
	it("should fetch all products", async () => {
		// Mock the behaviour of the Product.find method
		findMock.mockResolvedValue([mockProduct]);

		const res = await request(app).get("/api/products/get/");
		expect(res.statusCode).toEqual(200);
		expect(res.body).toHaveProperty("products");
		expect(Array.isArray(res.body.products)).toBeTruthy();
		expect(findMock).toHaveBeenCalled();
	});

	// Test for readProduct
	it("should fetch a single product by ID", async () => {
		// Mock the behaviour of the Product.findById method
		findByIdMock.mockResolvedValue(new Product(mockProduct));

		const productId = "Sample Id";
		const res = await request(app).get(`/api/products/get/${productId}`);

		if (res.statusCode === 200) {
			expect(res.body).toHaveProperty("product");
			expect(typeof res.body.product).toBe("object");
			expect(findByIdMock).toHaveBeenCalled();
		} else {
			expect(res.statusCode).toEqual(404);
			expect(res.body).toHaveProperty("message", "Product not found");
		}
	});

	// Test for successful update
	it("should successfully update a product by ID", async () => {
		const productId = "Sample Id";
		const updateData = { name: "Updated Name" };

		findByIdMock.mockResolvedValue(new Product(mockProduct));
		saveMock.mockResolvedValue(mockProduct);

		const res = await request(app)
			.patch(`/api/products/update/${productId}`)
			.send(updateData);

		expect(res.statusCode).toEqual(200);
		expect(res.body).toHaveProperty("product");
		expect(res.body.product.name).toEqual("Updated Name");
		expect(findByIdMock).toHaveBeenCalled();
		expect(saveMock).toHaveBeenCalled();
	});


	it("should delete a product by ID", async () => {
		const productId = "Sample Id";

		findOneAndDeleteMock.mockResolvedValue(mockProduct);
		const res = await request(app).delete(`/api/products/delete/${productId}`);

		if (res.statusCode === 201) {
			expect(res.body).toHaveProperty(
				"message",
				`${productId} Deleted from database!`,
			);
		} else {
			expect(res.statusCode).toEqual(500);
			expect(res.body).toHaveProperty("message", "Product not found");
			expect(findOneAndDeleteMock).toHaveBeenCalled();
		}
	});

	// Test for product not found
	it("should return 404 if product is not found", async () => {
		const productId = "Sample Id";

		findByIdMock.mockResolvedValue(null);

		const res = await request(app).patch(`/api/products/update/${productId}`);

		expect(res.statusCode).toEqual(404);
		expect(res.body).toHaveProperty("message", "Product not found");
		expect(findByIdMock).toHaveBeenCalled();
	});

	// Test for database error during findById
	it("should return 500 if an error occurs during findById", async () => {
		const productId = "Sample Id";
		const updateData = { name: "Updated Name" };

		Product.findById = jest.fn(() =>
			Promise.reject(new Error("Test error during findById")),
		);

		const res = await request(app)
			.patch(`/api/products/update/${productId}`)
			.send(updateData);

		expect(res.statusCode).toEqual(500);
		expect(res.body).toHaveProperty("error");
		expect(Product.findById).toHaveBeenCalled();
	});

	// Test for server error during update
	it("should return 500 if an error occurs during update", async () => {
		const productId = "Sample Id";
		const updateData = { name: "Updated Name" };

		findByIdMock.mockResolvedValue(new Product(mockProduct));
		Product.prototype.save = jest.fn(() =>
			Promise.reject(new Error("Test save error")),
		);

		const res = await request(app)
			.patch(`/api/products/update/${productId}`)
			.send(updateData);

		expect(res.statusCode).toEqual(500);
		expect(res.body).toHaveProperty("error");
		expect(findByIdMock).toHaveBeenCalled();
		expect(Product.prototype.save).toHaveBeenCalled();
	});
});
