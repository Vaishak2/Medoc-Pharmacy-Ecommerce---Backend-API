"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/bannerRoutes.ts
const express_1 = require("express");
const bannerController_1 = require("../controllers/bannerController");
const router = (0, express_1.Router)();
router.get('/banners', bannerController_1.getBannerUrls);
router.post('/banners', bannerController_1.addBanner);
exports.default = router;
