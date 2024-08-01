// src/repositories/subcategoryRepository.ts
import { getRepository } from 'typeorm';
import Subcategory from '../models/subcategory';
import { EntityRepository, Repository } from 'typeorm';
import { SubCategory } from '../models/subcategory';

const createSubCategory = async (subCategoryData: Partial<Subcategory>) => {
  const subCategoryRepository = getRepository(Subcategory);
  const subCategory = subCategoryRepository.create(subCategoryData);
  await subCategoryRepository.save(subCategory);
  return subCategory;
};

const getAllSubCategories = async (category_id: any) => {
  const subcategoryRepository = getRepository(Subcategory);
  return await subcategoryRepository.find( category_id );
};



@EntityRepository(SubCategory)
export class SubCategoryRepository extends Repository<SubCategory> {}


export default { createSubCategory, getAllSubCategories };
