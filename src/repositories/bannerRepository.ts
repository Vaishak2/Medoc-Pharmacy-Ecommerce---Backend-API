// src/repositories/bannerRepository.ts
import { getRepository } from 'typeorm';
import Banner from '../models/banner';

const getBanners = async () => {
  const bannerRepository = getRepository(Banner);
  return await bannerRepository.find();
};

const createBanner = async (bannerImageUrl: string) => {
  const bannerRepository = getRepository(Banner);
  const newBanner = bannerRepository.create({ bannerImageUrl });
  await bannerRepository.save(newBanner);
  return newBanner;
};

export default { getBanners, createBanner };
