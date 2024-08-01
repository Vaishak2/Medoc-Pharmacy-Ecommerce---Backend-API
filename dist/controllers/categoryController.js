"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllCategories = exports.createCategory = void 0;
const categoryService_1 = __importDefault(require("../services/categoryService"));
const createCategory = async (req, res) => {
    const { name } = req.body;
    try {
        if (!name) {
            throw new Error("Name is required");
        }
        const category = await categoryService_1.default.createCategory(name);
        res.status(201).json({ message: 'Category created successfully', category });
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
};
exports.createCategory = createCategory;
const getAllCategories = async (req, res) => {
    try {
        const categories = await categoryService_1.default.getAllCategories();
        res.status(200).json({ categories });
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
};
exports.getAllCategories = getAllCategories;
