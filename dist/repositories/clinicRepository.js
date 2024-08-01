"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const clinic_1 = __importDefault(require("../models/clinic"));
const getAllClinics = async () => {
    return clinic_1.default.findAll();
};
const createClinic = async (clinicData) => {
    return clinic_1.default.create(clinicData);
};
exports.default = { getAllClinics, createClinic };
