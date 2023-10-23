import axios from "axios";

export const createProduct = async () => {
	const res = await axios.post("/api/products");
	return res;
};

export const getProducts = async () => {
	const res = await axios.get("/api/products");
	return res;
};

export const getProduct = async (productId) => {
	const res = await axios.get(`/api/products/${productId}`);
	return res;
};

export const updateProduct = async (productId) => {
	const res = await axios.patch(`/api/products/${productId}`);
	return res;
};

export const removeProduct = async (productId) => {
	const res = await axios.delete(`/api/products/${productId}`);
	return res;
};
