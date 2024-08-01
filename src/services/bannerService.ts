// src/services/bannerService.ts
import bannerRepository from '../repositories/bannerRepository';

const getBannerUrls = async () => {
  return await bannerRepository.getBanners();
};

const addBanner = async (bannerImageUrl: string) => {
  return await bannerRepository.createBanner(bannerImageUrl);
};

export default { getBannerUrls, addBanner };
