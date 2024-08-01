"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.labService = exports.appointmentService = exports.clinicService = exports.userService = exports.productService = exports.authService = void 0;
var authService_1 = require("./authService");
Object.defineProperty(exports, "authService", { enumerable: true, get: function () { return __importDefault(authService_1).default; } });
var productService_1 = require("./productService");
Object.defineProperty(exports, "productService", { enumerable: true, get: function () { return __importDefault(productService_1).default; } });
var userService_1 = require("./userService");
Object.defineProperty(exports, "userService", { enumerable: true, get: function () { return __importDefault(userService_1).default; } });
var clinicService_1 = require("./clinicService");
Object.defineProperty(exports, "clinicService", { enumerable: true, get: function () { return __importDefault(clinicService_1).default; } });
var appointmentService_1 = require("./appointmentService");
Object.defineProperty(exports, "appointmentService", { enumerable: true, get: function () { return __importDefault(appointmentService_1).default; } });
var labService_1 = require("./labService");
Object.defineProperty(exports, "labService", { enumerable: true, get: function () { return __importDefault(labService_1).default; } });
