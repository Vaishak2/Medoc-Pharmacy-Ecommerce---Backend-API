"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.labRepository = exports.appointmentRepository = exports.clinicRepository = exports.productRepository = exports.userRepository = void 0;
var userRepository_1 = require("./userRepository");
Object.defineProperty(exports, "userRepository", { enumerable: true, get: function () { return __importDefault(userRepository_1).default; } });
var productRepository_1 = require("./productRepository");
Object.defineProperty(exports, "productRepository", { enumerable: true, get: function () { return __importDefault(productRepository_1).default; } });
var clinicRepository_1 = require("./clinicRepository");
Object.defineProperty(exports, "clinicRepository", { enumerable: true, get: function () { return __importDefault(clinicRepository_1).default; } });
var appointmentRepository_1 = require("./appointmentRepository");
Object.defineProperty(exports, "appointmentRepository", { enumerable: true, get: function () { return __importDefault(appointmentRepository_1).default; } });
var labRepository_1 = require("./labRepository");
Object.defineProperty(exports, "labRepository", { enumerable: true, get: function () { return __importDefault(labRepository_1).default; } });
