"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/repositories/productRepository.ts
const typeorm_1 = require("typeorm");
const product_1 = __importDefault(require("../models/product"));
const createProduct = async (productData) => {
    const productRepository = (0, typeorm_1.getRepository)(product_1.default);
    const product = productRepository.create(productData);
    await productRepository.save(product);
    return product;
};
const getAllProducts = async () => {
    const productRepository = (0, typeorm_1.getRepository)(product_1.default);
    return await productRepository.find({ relations: ['category'] });
};
exports.default = { createProduct, getAllProducts };
