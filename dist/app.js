"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/app.ts
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const productRoutes_1 = __importDefault(require("./routes/productRoutes"));
const categoryRoutes_1 = __importDefault(require("./routes/categoryRoutes"));
const bannerRoutes_1 = __importDefault(require("./routes/bannerRoutes"));
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use('/api', userRoutes_1.default);
app.use('/api/auth', authRoutes_1.default);
app.use('/api', productRoutes_1.default);
app.use('/api', categoryRoutes_1.default);
app.use('/api', bannerRoutes_1.default); // Added banner routes
exports.default = app;
// app.use('/api', userRoutes);
// app.use('/api',productRoutes);
