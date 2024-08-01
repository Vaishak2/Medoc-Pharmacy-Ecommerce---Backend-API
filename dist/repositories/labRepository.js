"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const labRequest_1 = __importDefault(require("../models/labRequest"));
const getAllLabRequests = async () => {
    return labRequest_1.default.findAll();
};
const createLabRequest = async (labRequestData) => {
    return labRequest_1.default.create(labRequestData);
};
exports.default = { getAllLabRequests, createLabRequest };
