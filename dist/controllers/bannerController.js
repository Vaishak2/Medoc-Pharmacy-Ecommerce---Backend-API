"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBannerUrls = void 0;
const bannerService_1 = __importDefault(require("../services/bannerService"));
const getBannerUrls = async (req, res) => {
    try {
        const bannerUrls = await bannerService_1.default.getBannerUrls();
        res.status(200).json(bannerUrls);
    }
    catch (error) {
        res.status(400).json({ message: err.message });
    }
};
exports.getBannerUrls = getBannerUrls;
