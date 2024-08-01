"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const clinicRepository_1 = __importDefault(require("../repositories/clinicRepository"));
const getAllClinics = async () => {
    return clinicRepository_1.default.getAllClinics();
};
const createClinic = async (name, location) => {
    return clinicRepository_1.default.createClinic({ name, location });
};
exports.default = { getAllClinics, createClinic };
