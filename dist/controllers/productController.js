"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllProducts = exports.createProduct = void 0;
const productService_1 = __importDefault(require("../services/productService"));
const createProduct = async (req, res) => {
    const { name, price, description, categoryId } = req.body;
    try {
        if (!name || !price || !categoryId) {
            throw new Error("Name, price, and category ID are required");
        }
        const product = await productService_1.default.createProduct(name, price, description, categoryId);
        res.status(201).json({ message: 'Product created successfully', product });
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
};
exports.createProduct = createProduct;
const getAllProducts = async (req, res) => {
    try {
        const products = await productService_1.default.getAllProducts();
        res.status(200).json({ products });
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
};
exports.getAllProducts = getAllProducts;
