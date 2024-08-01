"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const user_1 = require("../models/user");
const product_1 = require("../models/product");
const category_1 = require("../models/category");
const env_1 = __importDefault(require("./env")); // Import the whole config object
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: env_1.default.DB_HOST,
    port: env_1.default.DB_PORT,
    username: env_1.default.DB_USER,
    password: env_1.default.DB_PASSWORD,
    database: env_1.default.DB_NAME,
    entities: [user_1.User, product_1.Product, category_1.Categories],
    synchronize: true,
});
