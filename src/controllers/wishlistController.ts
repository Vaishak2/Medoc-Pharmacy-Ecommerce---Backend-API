// wishlistController.ts
import { Request, Response } from 'express';
import { addToWishlist, removeFromWishlist, getWishlistDetails } from '../services/wishlistService';
import { createNotification } from '../repositories/notificationRepository';

export const addToWishlistController = async (req: Request, res: Response) => {
  const { userId, productId } = req.body;

  const data = await addToWishlist(userId, productId);
  res.json(data);
};

// #######################   NOT REQUIRED FOR NOW   #########################

// export const addToWishlistController = async (req: Request, res: Response) => {
//   const { userId, productId } = req.body;
//   try {
//     const wishlistItem = await addProductToWishlist(userId, productId);
//     await createNotification(userId, 'Product Added to Wishlist', `Product ${productId} has been added to your wishlist`);
//     res.status(201).json({ message: 'Product added to wishlist', wishlistItem });
//   } catch (error) {
//     res.status(500).json({ message: 'Error adding product to wishlist', error });
//   }
// };


export const removeFromWishlistController = async (req: Request, res: Response) => {
  const { userId, productId } = req.body;

  const result = await removeFromWishlist(userId, productId);
  res.json(result);
};

export const getWishlistDetailsController = async (req: Request, res: Response) => {
  const { userId, pageNumber } = req.params;
  const pageSize = 10; // or you can get from req.query.pageSize

  const result = await getWishlistDetails(parseInt(userId), parseInt(pageNumber), pageSize);
  res.json(result);
};
function addProductToWishlist(userId: any, productId: any) {
  throw new Error('Function not implemented.');
}

