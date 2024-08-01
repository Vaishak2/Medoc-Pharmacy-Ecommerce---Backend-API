"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const userRepository_1 = require("../repositories/userRepository");
class UserService {
    static async getAllUsers() {
        return userRepository_1.UserRepository.find();
    }
}
exports.UserService = UserService;
