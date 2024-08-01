// src/routes/offerRoutes.ts
import { Router } from 'express';
import offerController, { getOffersByUserId } from '../controllers/offerController';

const router = Router();

router.get('/offers', offerController.getOffers);
router.get('/offers/:userId', getOffersByUserId);
router.post('/offers', offerController.createOffer);

export default router;
