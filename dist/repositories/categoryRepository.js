"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/repositories/categoryRepository.ts
const typeorm_1 = require("typeorm");
const category_1 = __importDefault(require("../models/category"));
const createCategory = async (categoryData) => {
    const categoryRepository = (0, typeorm_1.getRepository)(category_1.default);
    const category = categoryRepository.create(categoryData);
    await categoryRepository.save(category);
    return category;
};
const getAllCategories = async () => {
    const categoryRepository = (0, typeorm_1.getRepository)(category_1.default);
    return await categoryRepository.find({ relations: ['products'] });
};
exports.default = { createCategory, getAllCategories };
