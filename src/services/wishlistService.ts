// wishlistService.ts
import { getRepository } from 'typeorm';
import { Wishlist } from '../models/wishlistModel';
import { User } from '../models/user';
import { Product } from '../models/product';

export const addToWishlist = async (userId: number, productId: number) => {
  try {
    const userRepository = getRepository(User);
    const productRepository = getRepository(Product);
    const wishlistRepository = getRepository(Wishlist);

    const user = await userRepository.findOne({ where: { id: userId } });
    const product = await productRepository.findOne({ where: { id: productId } });

    if (!user || !product) {
      return { message: 'User or Product not found' };
    }

    const wishlistItem = await wishlistRepository.findOne({ 
      where: { 
        user: { id: userId }, 
        product: { id: productId } 
      } 
    });

    if (wishlistItem) {
      return { message: 'Product already in wishlist' };
    }

    const newWishlistItem = wishlistRepository.create({ user, product });
    await wishlistRepository.save(newWishlistItem);
    product.is_wishlist = true
    await productRepository.save(product);
    return {
      message: 'Product added to wishlist successfully',
      wishlistItem: {
        id: newWishlistItem.id,
        productId: newWishlistItem.product.id,
      }
    };
  } catch (error) {
    return { message: 'Error adding product to wishlist', error };
  }
};

export const removeFromWishlist = async (userId: number, productId: number) => {
  try {
    const wishlistRepository = getRepository(Wishlist);
    const productRepository = getRepository(Product);


    const wishlistItem = await wishlistRepository.findOne({ 
      where: { 
        user: { id: userId }, 
        product: { id: productId } 
      } 
     });
    const product = await productRepository.findOne({ where: { id: productId } });
    product!.is_wishlist= false
    await productRepository.save(product!);


    if (!wishlistItem) {
      return { message: 'Wishlist item not found' };
    }
    await wishlistRepository.remove(wishlistItem);

    return { message: 'Product removed from wishlist successfully' };
  } catch (error) {
    return { message: 'Error removing product from wishlist', error };
  }
};

export const getWishlistDetails = async (userId: number, pageNumber: number, pageSize: number = 10) => {
  const wishlistRepository = getRepository(Wishlist);

  const skip = (pageNumber - 1) * pageSize;

  const [wishlistItems, total] = await wishlistRepository.findAndCount({
    where: { user: { id: userId } },
    relations: ['product'],
    skip : Number(skip),
    take: pageSize
  });

  let subTotal = 0;
//   wishlistItems.forEach(item => {
//     subTotal += item.product.price * item.quantity;
//   });

  return {
    message : "Success",
    data:{
    wishlistItems,
    subTotal,
    total,
    pageNumber,
    pageSize
    }
  };
};
