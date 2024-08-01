// src/services/dealService.ts
import {dealRepository, getDealsByUserId} from '../repositories/dealRepository';

const createDeal = async (title: string, description: string, productId: number, discountPrice: number, image_url?: string) => {
  return await dealRepository.createDeal({ title, description, productId, discountPrice, image_url });
};

const getAllDeals = async () => {
  return await dealRepository.getAllDeals();
};

export const fetchDealsByUserId = async (userId: number) => {
  return await getDealsByUserId(userId);
};
export default { createDeal, getAllDeals };
