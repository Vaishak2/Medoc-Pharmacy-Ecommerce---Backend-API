// src/routes/dealRoutes.ts
import { Router } from 'express';
import { addDeal, fetchDeals, fetchDealById, getDeals } from '../controllers/dealController';
// import authMiddleware from '../middlewares/authMiddleware';

const router = Router();

router.post('/deals', addDeal);
router.get('/deals', fetchDeals);
router.get('/deals/:id',  fetchDealById);
router.get('/deals/user/:userId', getDeals);

export default router;
