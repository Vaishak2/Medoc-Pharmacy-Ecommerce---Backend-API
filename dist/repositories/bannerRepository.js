"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/repositories/bannerRepository.ts
const database_1 = __importDefault(require("../utils/database"));
const banner_1 = __importDefault(require("../models/banner"));
const getAllBanners = async () => {
    const bannerRepository = database_1.default.getRepository(banner_1.default);
    return await bannerRepository.find();
};
const createBanner = async (banner_imageurl) => {
    const bannerRepository = database_1.default.getRepository(banner_1.default);
    const newBanner = bannerRepository.create({ banner_imageurl });
    await bannerRepository.save(newBanner);
    return newBanner;
};
exports.default = { getAllBanners, createBanner };
