"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/repositories/userRepository.ts
const typeorm_1 = require("typeorm");
const user_1 = require("../models/user");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const createUser = async (userData) => {
    const userRepository = (0, typeorm_1.getRepository)(user_1.User);
    const hashedPassword = await bcryptjs_1.default.hash(userData.password, 10);
    const user = userRepository.create({ ...userData, password: hashedPassword });
    await userRepository.save(user);
    return user;
};
const findUserByUsername = async (username) => {
    const userRepository = (0, typeorm_1.getRepository)(user_1.User);
    return await userRepository.findOne({ where: { username } });
};
const findUserByEmail = async (email) => {
    const userRepository = (0, typeorm_1.getRepository)(user_1.User);
    return await userRepository.findOne({ where: { email } });
};
exports.default = { createUser, findUserByUsername, findUserByEmail };
