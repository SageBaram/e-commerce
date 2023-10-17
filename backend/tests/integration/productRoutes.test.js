const request = require("supertest");
const startServer = require("@app/src/server");
const { closeDB } = require("@services/database");
const Product = require("@models/productModel");

let app;
let productId; // To store the product ID for testing read and delete operations

beforeAll(async () => {
  app = await startServer();
});

afterAll(async () => {
  if (productId) {
    // If a product was created, delete it from the database
    await Product.findByIdAndDelete(productId);
  }
  await closeDB();
});

describe("Product Controller Integration Tests", () => {
  // Test creating a new product
  it("should create a new product", async () => {
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
    productId = res.body.product._id; // Store the product ID for future tests
  });

  // Test reading a product by ID
  it("should read a product by ID", async () => {
    const res = await request(app).get(`/api/products/get/${productId}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("product");
  });

  // Test reading all products
  it("should read all products", async () => {
    const res = await request(app).get("/api/products/get/");

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("products");
    expect(Array.isArray(res.body.products)).toBeTruthy();
  });

  // Test updating a product by ID
  it("should update a product by ID", async () => {
    const updateData = {
      name: "Updated Name",
      price: 200,
    };

    const res = await request(app)
      .patch(`/api/products/update/${productId}`)
      .send(updateData);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("product");
    expect(res.body.product.name).toEqual("Updated Name");
    expect(res.body.product.price).toEqual(200);
  });

  // Test deleting a product by ID
  it("should delete a product by ID", async () => {
    const res = await request(app).delete(`/api/products/delete/${productId}`);

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("message");
  });

  // Test attempting to read a deleted product (should return 404)
  it("should return 404 if product is not found after deletion", async () => {
    const res = await request(app).get(`/api/products/get/${productId}`);

    expect(res.statusCode).toEqual(404);
    expect(res.body).toHaveProperty("message", "Product not found");
  });

  // Test attempting to update a deleted product (should return 404)
  it("should return 404 if product is not found when attempting to update", async () => {
    const updateData = {
      name: "Attempted Update",
    };

    const res = await request(app)
      .patch(`/api/products/update/${productId}`)
      .send(updateData);

    expect(res.statusCode).toEqual(404);
    expect(res.body).toHaveProperty("message", "Product not found");
  });
});
