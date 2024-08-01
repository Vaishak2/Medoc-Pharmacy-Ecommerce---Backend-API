import { getRepository } from 'typeorm';
import { RecentlyViewed } from '../models/recentlyViewed';
import { Product } from '../models/product';
import { User } from '../models/user';

export const getRecentlyViewedByUser = async (userId: number, searchKeyWord: string, pageNumber: number, pageSize: number) => {
  const recentlyViewedRepository = getRepository(RecentlyViewed);

  const [data, total] = await recentlyViewedRepository.findAndCount({
    where: {
      user: { id: userId },
      product: searchKeyWord ? { name: searchKeyWord } : {}
    },
    relations: ['product'],
    skip: (pageNumber - 1) * pageSize,
    take: pageSize,
    order: { createdAt: 'DESC' }
  });

  return {
    data: data.map(item => item.product),
    total,
    pageNumber,
    pageSize
  };
};

export const addRecentlyViewed = async (userId: number, productId: number) => {
  // console.log(userId,productId,"SSSSSSSSSSSSSSSSS")
  const recentlyViewedRepository = getRepository(RecentlyViewed);
  const userRepository = getRepository(User);
  const productRepository = getRepository(Product);

  const user = await userRepository.findOne({ where: { id: userId } });
  const product = await productRepository.findOne({ where: { id: productId } });

  if (!user || !product) {
    throw new Error('User or Product not found');
  }

  const existingEntry = await recentlyViewedRepository.findOne({
    where: { user: { id: userId }, product: { id: productId } },
  });

  if (!existingEntry) {
    const recentlyViewed = new RecentlyViewed();
    recentlyViewed.user = user;
    recentlyViewed.product = product;
    recentlyViewed.createdAt = new Date();

    await recentlyViewedRepository.save(recentlyViewed);
  }
};
