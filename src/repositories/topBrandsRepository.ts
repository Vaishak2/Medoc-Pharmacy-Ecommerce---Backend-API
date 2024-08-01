import { getRepository } from 'typeorm';
import { Top_brands } from '../models/topBrands';

const getTopBrands = async () => {
  const topBrandsRepository = getRepository(Top_brands);
  return await topBrandsRepository.find();
};

const createTopBrands = async (topBrandData: Partial<Top_brands>) => {
    const topBrandsRepository = getRepository(Top_brands);
    const topBrands = topBrandsRepository.create(topBrandData);
    await topBrandsRepository.save(topBrands);
    return topBrands;
  };

export default { getTopBrands, createTopBrands };
