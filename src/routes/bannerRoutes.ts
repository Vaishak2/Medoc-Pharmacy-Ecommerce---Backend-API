// src/routes/bannerRoutes.ts
import { Router } from 'express';
import { getBannerUrls, addBanner } from '../controllers/bannerController';

const router = Router();

router.get('/banners', getBannerUrls);
router.post('/banners', addBanner);

export default router;
