"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/services/productService.ts
const productRepository_1 = __importDefault(require("../repositories/productRepository"));
const createProduct = async (name, price, description, categoryId) => {
    return await productRepository_1.default.createProduct({ name, price, description, categoryId });
};
const getAllProducts = async () => {
    return await productRepository_1.default.getAllProducts();
};
exports.default = { createProduct, getAllProducts };
