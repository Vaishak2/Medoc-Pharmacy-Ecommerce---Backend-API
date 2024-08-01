
// GET /api/coupons
// POST /api/coupons
// Retrieves a list of all available coupons.

import { Router } from 'express';
import couponController from '../controllers/couponController';

const router = Router();

router.get('/coupons/:userId/:pageNumber/:searchKeyWord?', couponController.getCoupons);
router.post('/coupons', couponController.createCoupon);

export default router;
