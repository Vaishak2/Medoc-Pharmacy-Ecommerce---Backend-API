"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const appointmentRepository_1 = __importDefault(require("../repositories/appointmentRepository"));
const getAllAppointments = async () => {
    return appointmentRepository_1.default.getAllAppointments();
};
const createAppointment = async (patientId, doctorId, date) => {
    return appointmentRepository_1.default.createAppointment({ patientId, doctorId, date });
};
exports.default = { getAllAppointments, createAppointment };
