"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const authService_1 = __importDefault(require("../services/authService"));
const register = async (req, res) => {
    const { username, password, email } = req.body;
    try {
        if (!username || !password || !email) {
            throw new Error("Username, password, and email are required");
        }
        const user = await authService_1.default.register(username, password, email);
        res.status(201).json({ message: 'User registered successfully', user });
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
};
exports.register = register;
const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        if (!username || !password) {
            throw new Error("Username and password are required");
        }
        const token = await authService_1.default.login(username, password);
        res.status(200).json({ token });
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
};
exports.login = login;
