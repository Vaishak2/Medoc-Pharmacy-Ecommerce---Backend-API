"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/services/categoryService.ts
const categoryRepository_1 = __importDefault(require("../repositories/categoryRepository"));
const createCategory = async (name) => {
    return await categoryRepository_1.default.createCategory({ name });
};
const getAllCategories = async () => {
    return await categoryRepository_1.default.getAllCategories();
};
exports.default = { createCategory, getAllCategories };
