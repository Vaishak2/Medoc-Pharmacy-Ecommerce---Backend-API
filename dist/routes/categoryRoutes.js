"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/categoryRoutes.ts
const express_1 = require("express");
const categoryController_1 = require("../controllers/categoryController");
const router = (0, express_1.Router)();
router.post('/categories', categoryController_1.createCategory);
router.get('/categories', categoryController_1.getAllCategories);
exports.default = router;
