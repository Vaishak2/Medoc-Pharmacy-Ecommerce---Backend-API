"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const labService_1 = __importDefault(require("../services/labService"));
const getAllLabRequests = async (req, res) => {
    const labRequests = await labService_1.default.getAllLabRequests();
    res.json(labRequests);
};
const createLabRequest = async (req, res) => {
    const { patientId, testId, date } = req.body;
    const labRequest = await labService_1.default.createLabRequest(patientId, testId, date);
    res.json(labRequest);
};
exports.default = { getAllLabRequests, createLabRequest };
