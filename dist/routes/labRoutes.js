"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const labController_1 = __importDefault(require("../controllers/labController"));
const router = (0, express_1.Router)();
router.get('/', labController_1.default.getAllLabRequests);
router.post('/', labController_1.default.createLabRequest);
exports.default = router;
