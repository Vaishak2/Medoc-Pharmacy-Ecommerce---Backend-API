"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/services/authService.ts
const userRepository_1 = __importDefault(require("../repositories/userRepository"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const login = async (username, password) => {
    const user = await userRepository_1.default.findUserByUsername(username);
    if (!user) {
        throw new Error('User not found');
    }
    const isPasswordValid = await bcryptjs_1.default.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error('Invalid password');
    }
    try {
        if (!process.env.JWT_SECRET) {
            throw new Error('JWT_SECRET is not defined in the environment variables');
        }
        const token = jsonwebtoken_1.default.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return token;
    }
    catch (error) {
        console.error('Error generating JWT token:', error);
        throw new Error('Error generating JWT token');
    }
};
const register = async (username, password, email) => {
    const existingUser = await userRepository_1.default.findUserByUsername(username);
    if (existingUser) {
        throw new Error('Username already taken');
    }
    const existingEmail = await userRepository_1.default.findUserByEmail(email);
    if (existingEmail) {
        throw new Error('Email already registered');
    }
    const user = await userRepository_1.default.createUser({ username, password, email });
    return user;
};
exports.default = { login, register };
