import { Router } from 'express';
import { getRecentlyViewedController } from '../controllers/recentlyViewedController';

const router = Router();

router.get('/recentlyView/:userId', getRecentlyViewedController);

export default router;
