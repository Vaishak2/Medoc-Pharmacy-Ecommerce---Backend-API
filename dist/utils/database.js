"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/utils/database.ts
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const dotenv_1 = __importDefault(require("dotenv"));
// import User from '../models/user';
const banner_1 = __importDefault(require("../models/banner"));
const category_1 = __importDefault(require("../models/category"));
const product_1 = __importDefault(require("../models/product"));
dotenv_1.default.config();
const AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: false,
    entities: [banner_1.default, category_1.default, product_1.default],
    migrations: [],
    subscribers: [],
});
exports.default = AppDataSource;
