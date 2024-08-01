// src/repositories/dealRepository.ts
import { getRepository } from 'typeorm';
import { Deal } from '../models/dealModel';

export const createDeal = async (dealData: Partial<Deal>) => {
  const dealRepository = getRepository(Deal);
  const newDeal = dealRepository.create(dealData);
  await dealRepository.save(newDeal);
  return newDeal;
};

export const getAllDeals = async () => {
  const dealRepository = getRepository(Deal);
  return await dealRepository.find({ relations: ['product'] });
};

export const getDealById = async (id: number) => {
  const dealRepository = getRepository(Deal);
  return await dealRepository.findOne({
    where: { id },
    relations: ['product'],
  });
};

export const getDealsByUserId = async (userId: number) => {
  const dealRepository = getRepository(Deal);
  return await dealRepository.find({ where: { user: { id: userId } }, relations: ['product', 'user'] });
};