"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const clinicService_1 = __importDefault(require("../services/clinicService"));
const getAllClinics = async (req, res) => {
    const clinics = await clinicService_1.default.getAllClinics();
    res.json(clinics);
};
const createClinic = async (req, res) => {
    const { name, location } = req.body;
    const clinic = await clinicService_1.default.createClinic(name, location);
    res.json(clinic);
};
exports.default = { getAllClinics, createClinic };
