"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const appointmentService_1 = __importDefault(require("../services/appointmentService"));
const getAllAppointments = async (req, res) => {
    const appointments = await appointmentService_1.default.getAllAppointments();
    res.json(appointments);
};
const createAppointment = async (req, res) => {
    const { patientId, doctorId, date } = req.body;
    const appointment = await appointmentService_1.default.createAppointment(patientId, doctorId, date);
    res.json(appointment);
};
exports.default = { getAllAppointments, createAppointment };
