const request = require("supertest");
const express = require("express");
const app = require("@app/app");
const Product = require("@models/productModel");

app.use("/api/products", require("@routes/productRoutes"));

// Product mockup
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

// Commonly used variables in various tests
const productId = "Sample Id";
const updateData = { name: "Updated Name" };

// Product Controller Tests
describe("Product Controller", () => {
	// Function mockups
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
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	// Test for createProduct
	describe("Product CRUD", () => {
		describe("Create Product", () => {
			it("should successfully create a new product and return it in the response body with a 201 status code", async () => {
				// Mock the behavior of the Product.save method
				const { _id, ...newProduct } = mockProduct;

				saveMock.mockResolvedValue(newProduct);
				const res = await request(app).post("/api/products/").send(newProduct);

				expect(res.statusCode).toEqual(201);
				expect(res.body).toHaveProperty("product");
				expect(saveMock).toHaveBeenCalled();
			});

			it("should return a 500 status code and an error message when an exception is thrown during product creation", async () => {
				saveMock.mockRejectedValue(new Error("Error during product creation"));

				const res = await request(app).post("/api/products/").send();

				expect(res.statusCode).toEqual(500);

				expect(saveMock).toHaveBeenCalled();
				expect(findMock).not.toHaveBeenCalled();
			});
		});
		describe("Fetch all products", () => {
			// Test for readAllProducts
			it("should successfully fetch all products, return them in the response body, and have a 200 status code", async () => {
				// Mock the behaviour of the Product.find method
				findMock.mockResolvedValue([mockProduct]);

				const res = await request(app).get("/api/products/");
				expect(res.statusCode).toEqual(200);
				expect(res.body).toHaveProperty("products");
				expect(Array.isArray(res.body.products)).toBeTruthy();
				expect(findMock).toHaveBeenCalled();
			});

			it("should return a 500 status code and an error message when an exception is thrown during fetching all products", async () => {
				// Mock the behaviour of the Product.find method
				findMock.mockRejectedValue(
					new Error("Error during fetching all products"),
				);

				const res = await request(app).get("/api/products/");

				expect(res.statusCode).toEqual(500);
				expect(Array.isArray(res.body.products)).toBeFalsy();
				expect(findMock).toHaveBeenCalled();
				expect(saveMock).not.toHaveBeenCalled();
			});
		});
		describe("Fetch a product", () => {
			// Test for readProduct
			it("should successfully fetch a single product by its ID and return it in the response body with a 200 status code", async () => {
				findByIdMock.mockResolvedValue(new Product(mockProduct));

				const res = await request(app).get(`/api/products/${productId}`);

				expect(res.statusCode).toEqual(200);
				expect(res.body).toHaveProperty("product");
				expect(typeof res.body.product).toBe("object");
				expect(findByIdMock).toHaveBeenCalled();
			});
			it("should return a 404 status code and an error message when the product ID is not found in the database", async () => {
				findByIdMock.mockResolvedValue(null);

				const res = await request(app).get(`/api/products/${productId}`);

				expect(res.statusCode).toEqual(404);
			});
			it("should return a 500 status code and an error message when an exception is thrown during fetching a single product", async () => {
				findByIdMock.mockRejectedValue(
					new Error("Error during fetching a single product"),
				);

				const res = await request(app).get(`/api/products/${productId}`);

				expect(res.statusCode).toEqual(500);
				expect(findByIdMock).toHaveBeenCalled();
			});
		});
		describe("Update a product", () => {
			// Successful update
			it("should successfully update a product by its ID, return the updated product in the response body, and have a 200 status code", async () => {
				findByIdMock.mockResolvedValue(new Product(mockProduct));
				saveMock.mockResolvedValue(mockProduct);

				const res = await request(app)
					.patch(`/api/products/${productId}`)
					.send(updateData);

				expect(res.statusCode).toEqual(200);
				expect(res.body).toHaveProperty("product");
				expect(res.body.product.name).toEqual("Updated Name");
				expect(findByIdMock).toHaveBeenCalled();
				expect(saveMock).toHaveBeenCalled();
			});

			it("should return a 404 status code and an error message when the product ID is not found in the database for updating", async () => {
				findByIdMock.mockResolvedValue(null);

				const res = await request(app)
					.patch(`/api/products/${productId}`)
					.send(updateData);

				expect(res.statusCode).toEqual(404);
				expect(findByIdMock).toHaveBeenCalled();
				expect(saveMock).not.toHaveBeenCalled();
			});

			it("should return a 500 status code and an error message when an exception is thrown during the product update process", async () => {
				findByIdMock.mockResolvedValue(new Product(mockProduct));
				saveMock.mockRejectedValue(new Error("Error during product update"));

				const res = await request(app)
					.patch(`/api/products/${productId}`)
					.send(updateData);

				expect(res.statusCode).toEqual(500);
				expect(findByIdMock).toHaveBeenCalled();
				expect(saveMock).toHaveBeenCalled();
			});
		});
		describe("Delete product", () => {
			it("should successfully delete a product by its ID and return a confirmation message with a 200 status code", async () => {
				findOneAndDeleteMock.mockResolvedValue(mockProduct);
				const res = await request(app).delete(`/api/products/${productId}`);
				expect(res.statusCode).toEqual(200);
				expect(res.body).toHaveProperty(
					"message",
					`${productId} Deleted from database!`,
				);
				expect(findOneAndDeleteMock).toHaveBeenCalled();
			});

			it("should return a 404 status code and an error message when the product ID is not found in the database for deletion", async () => {
				findOneAndDeleteMock.mockRejectedValue(null);
				const res = await request(app).delete(`/api/products/${productId}`);

				expect(res.statusCode).toEqual(404);
				expect(findOneAndDeleteMock).toHaveBeenCalled();
			});
		});
	});
});
