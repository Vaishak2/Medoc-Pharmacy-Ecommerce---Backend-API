"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const clinicController_1 = __importDefault(require("../controllers/clinicController"));
const router = (0, express_1.Router)();
router.get('/', clinicController_1.default.getAllClinics);
router.post('/', clinicController_1.default.createClinic);
exports.default = router;
