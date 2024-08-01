"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.labController = exports.appointmentController = exports.clinicController = exports.userController = exports.productController = exports.authController = void 0;
var authController_1 = require("./authController");
Object.defineProperty(exports, "authController", { enumerable: true, get: function () { return __importDefault(authController_1).default; } });
var productController_1 = require("./productController");
Object.defineProperty(exports, "productController", { enumerable: true, get: function () { return __importDefault(productController_1).default; } });
var userController_1 = require("./userController");
Object.defineProperty(exports, "userController", { enumerable: true, get: function () { return __importDefault(userController_1).default; } });
var clinicController_1 = require("./clinicController");
Object.defineProperty(exports, "clinicController", { enumerable: true, get: function () { return __importDefault(clinicController_1).default; } });
var appointmentController_1 = require("./appointmentController");
Object.defineProperty(exports, "appointmentController", { enumerable: true, get: function () { return __importDefault(appointmentController_1).default; } });
var labController_1 = require("./labController");
Object.defineProperty(exports, "labController", { enumerable: true, get: function () { return __importDefault(labController_1).default; } });
