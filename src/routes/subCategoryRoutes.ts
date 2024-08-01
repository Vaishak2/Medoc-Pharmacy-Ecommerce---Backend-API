// src/routes/subCategoryRoutes.ts
import { Router } from 'express';
import { getSubCategories } from '../controllers/subcategoryControllers';


const router = Router();

// router.post('/subCategories', createSubCategory);
// router.get('/subCategories/:category_id', (req, res) => getAllSubCategories(req, res));
router.get('/categories/:categoryId/subcategories', getSubCategories);


export default router;