const Product = require("@models/productModel");

describe("Product Model Unit Tests", () => {
  it("should validate a product", () => {
    // Arrange
    const product = new Product({
      name: "Sample Product",
      name: "Sample Product",
      brand: "Sample Brand",
      category: "Sample Category",
      description: "Sample Description",
      image: "Image Sample",
      price: 100,
      countInStock: 10,
    });

    // Act
    const validation = product.validateSync();

    // Assert
    expect(validation).toBeUndefined();
  });
});
