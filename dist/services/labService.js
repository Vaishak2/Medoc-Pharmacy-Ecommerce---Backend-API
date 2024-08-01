"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const labRepository_1 = __importDefault(require("../repositories/labRepository"));
const getAllLabRequests = async () => {
    return labRepository_1.default.getAllLabRequests();
};
const createLabRequest = async (patientId, testId, date) => {
    return labRepository_1.default.createLabRequest({ patientId, testId, date });
};
exports.default = { getAllLabRequests, createLabRequest };
