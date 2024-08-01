// wishlistRoutes.ts
import { Router } from 'express';
import { addToWishlistController, removeFromWishlistController, getWishlistDetailsController } from '../controllers/wishlistController';

const router = Router();

router.post('/wishlist/add', addToWishlistController);
router.post('/wishlist/remove', removeFromWishlistController);
router.get('/wishlist/:userId/:pageNumber', getWishlistDetailsController);

export default router;
