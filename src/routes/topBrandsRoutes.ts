import { Router } from 'express';
import { createTopBrands, getAlltopBrands , filterListingController } from '../controllers/topBrandsController';
// import authMiddleware from '../middlewares/authMiddleware';//auth middleware to all protected routes

const router = Router();


router.get('/top_brands/:searchKeyWord?', getAlltopBrands);
router.post('/top_brands', createTopBrands);
router.get('/filterListing', filterListingController);

export default router;
