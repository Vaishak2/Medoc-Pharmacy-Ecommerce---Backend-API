"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const appointmentController_1 = __importDefault(require("../controllers/appointmentController"));
const router = (0, express_1.Router)();
router.get('/', appointmentController_1.default.getAllAppointments);
router.post('/', appointmentController_1.default.createAppointment);
exports.default = router;
