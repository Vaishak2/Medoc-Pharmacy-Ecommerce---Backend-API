import { Request, Response } from 'express';
import * as CartService from '../services/cartService';
import { applyCoupon } from '../services/cartService';
import { updateCart } from '../services/cartService';

export const addToCart = async (req: Request, res: Response) => {
    const { userId, productId, quantity, size} = req.body;

    try {
        const cartItem = await CartService.addToCart(userId, productId, quantity,size,);
        res.status(200).json({ message: 'Product added to cart successfully', data: cartItem });
    } catch (error) {
        res.status(500).json({ message: 'Error adding product to cart', error: (error as Error).message });
    }
};

export const removeFromCart = async (req: Request, res: Response) => {
    const { userId, productId } = req.body;
    const parsedUserId = parseInt(userId, 10);
    const parsedProductId = parseInt(productId, 10);

    try {
        const cartItem = await CartService.removeFromCart(parsedUserId, parsedProductId);
        res.status(200).json({ message: 'Product removed from cart successfully', data: cartItem });
    } catch (error) {
        res.status(500).json({ message: 'Error removing product from cart', error: (error as Error).message });
    }
};

export const getCartDetails = async (req: Request, res: Response) => {
  const { userId, pageNumber, couponId } = req.params;
  const { couponAmount } = req.query;

  try {
      const cartDetails = await CartService.getCartDetails(
          parseInt(userId),
          parseInt(pageNumber),
          couponId ? parseInt(couponId) : undefined,
          couponAmount ? parseInt(couponAmount as string) : undefined
      );

      res.status(200).json({ message: 'Success', data: cartDetails });
  } catch (error) {
      res.status(500).json({ message: 'Error fetching cart details', error: (error as Error).message });
  }
};

export const applyCouponController = async (req: Request, res: Response) => {
    const { subTotal, couponDiscount } = req.body;

    const couponDetails = applyCoupon(subTotal, couponDiscount);

    res.json({
        message: 'Coupon applied successfully',
        data: couponDetails
    });
};
export const updateCartItem = async (req: Request, res: Response) => {
    const { userId, productId, quantity, size } = req.body;
  
    try {
      const updatedCart = await updateCart(Number(userId), Number(productId), quantity, size);
      res.status(200).json({
        message: "Cart updated successfully",
        data: updatedCart
      });
    } catch (error) {
      res.status(500).json({
        message: "Error updating cart",
        error: (error as Error) .message
      });
    }
  };

  export const getCountsController = async (req: Request, res: Response) => {
    try {
      const { userId } = req.params;
      const userCounts = await CartService.getCountsByUserId(parseInt(userId, 10));
  
      res.json({
        message: 'Success',
        data: userCounts,
      });
    } catch (error) {
      res.status(500).json({
        message: 'Error fetching counts',
        error: (error as Error).message,
      });
    }
  };