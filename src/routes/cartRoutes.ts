// src/routes/cartRoutes.ts
import { Router } from 'express';
import * as CartController from '../controllers/cartController';
import { placeOrder, placeOrderByUserId, updateCartItem } from '../controllers/cartController';

const router = Router();

router.post('/cart/add', CartController.addToCart);
router.post('/cart/remove', CartController.removeFromCart);
router.get('/cart/:userId/:pageNumber/:couponId?', CartController.getCartDetails);
router.post('/cart/applyCoupon', CartController.applyCouponController);
router.put('/cart/update', updateCartItem);
router.get('/counts/:userId', CartController.getCountsController);
router.post('/cart/:cartId', placeOrder);
router.post('/carts/:userId', placeOrderByUserId);
// router.post('/cart/apply-coupon', applyCouponToCart);

export default router;
