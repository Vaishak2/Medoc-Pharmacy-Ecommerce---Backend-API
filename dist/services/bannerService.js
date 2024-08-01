"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/services/bannerService.ts
const bannerRepository_1 = __importDefault(require("../repositories/bannerRepository"));
const getBannerUrls = async () => {
    const banners = await bannerRepository_1.default.getAllBanners();
    return banners.map(banner => banner.banner_imageurl);
};
const addBanner = async (banner_imageurl) => {
    return await bannerRepository_1.default.createBanner(banner_imageurl);
};
exports.default = { getBannerUrls, addBanner };
