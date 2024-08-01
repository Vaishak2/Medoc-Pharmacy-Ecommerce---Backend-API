// src/routes/categoryRoutes.ts
import { Router } from 'express';
import { getCategories } from '../controllers/categoryController';
// import { createCategory, getAllCategories } from '../controllers/categoryController';

const router = Router();

// router.post('/categories', createCategory);
// router.get('/categories', getAllCategories);
router.get('/categories', getCategories);

export default router;
