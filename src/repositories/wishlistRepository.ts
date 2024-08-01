// src/repositories/wishlistRepository.ts
import { getRepository } from 'typeorm';
import { Wishlist } from '../models/wishlistModel';
import { User } from '../models/user';
import { Product } from '../models/product';

const addToWishlist = async (userId: number, productId: number) => {
  const wishlistRepository = getRepository(Wishlist);
  const userRepository = getRepository(User);
  const productRepository = getRepository(Product);

  const user = await userRepository.findOne({ where: { id: userId } });
  const product = await productRepository.findOne({ where: { id: productId } });

  if (!user || !product) {
    throw new Error('User or Product not found');
  }

  const wishlistItem = wishlistRepository.create({ user, product });
  await wishlistRepository.save(wishlistItem);
  product.is_wishlist = true;
  return wishlistItem;
};

const getWishlist = async (userId: number) => {
  const wishlistRepository = getRepository(Wishlist);
  return await wishlistRepository.find({
    where: { user: { id: userId } },
    relations: ['product'],
  });
};

const removeFromWishlist = async (userId: number, productId: number) => {
  const wishlistRepository = getRepository(Wishlist);
  const productRepository = getRepository(Product);
  const userRepository = getRepository(User);

  const user = await userRepository.findOne({ where: { id: userId } });
  const product = await productRepository.findOne({ where: { id: productId } });

  const item = await wishlistRepository.findOne({
    where: { user: { id: userId, } , product: { id: productId } },
  });
  
  if (!item) {
    throw new Error('Wishlist item not found');
  }
  
  const wishlistItem = wishlistRepository.findOne({where: { user: { id: userId }, product: { id: productId } }});
  await wishlistRepository.remove(item);
  product!.is_wishlist = true;
  return wishlistItem

};

export default { addToWishlist, getWishlist, removeFromWishlist };
