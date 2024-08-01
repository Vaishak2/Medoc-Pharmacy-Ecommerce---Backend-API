"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const appointment_1 = __importDefault(require("../models/appointment"));
const getAllAppointments = async () => {
    return appointment_1.default.findAll();
};
const createAppointment = async (appointmentData) => {
    return appointment_1.default.create(appointmentData);
};
exports.default = { getAllAppointments, createAppointment };
