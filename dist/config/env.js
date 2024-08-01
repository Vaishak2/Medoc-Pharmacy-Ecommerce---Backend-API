"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const config = {
    PORT: process.env.PORT || 3000,
    DB_HOST: process.env.DB_HOST || '194.238.23.134',
    DB_USER: process.env.DB_USER || 'postgres',
    DB_PASSWORD: process.env.DB_PASSWORD || '123456',
    DB_NAME: process.env.DB_NAME || 'db_medo_pharm',
    DB_PORT: Number(process.env.DB_PORT) || 5432,
};
exports.default = config;
