// src/routes/productRoutes.ts
import { Router } from 'express';
// import { createProduct, getAllProducts } from '../controllers/productController';
import { getProducts, getProductsByBrand ,getProduct, searchProduct,fetchSimilarProducts } from '../controllers/productController';


const router = Router();

// router.post('/products', createProduct);
// router.get('/products', getAllProducts);

router.post('/productListing', getProducts);
router.get('/:brandId/products/:pageNumber/:sortBy?', getProductsByBrand);
router.get('/products/:productId/:userId?', getProduct);
router.get('/productsSearch/:searchKeyWord?', searchProduct);
router.get('/similarProducts/:subcategoryId/:pageNumber', fetchSimilarProducts);
// router.post('/filter', filterProductsController);


export default router;

