// src/services/categoryService.ts
// import categoryRepository from '../repositories/categoryRepository';
import { getCustomRepository } from 'typeorm';
import { CategoryRepository } from '../repositories/categoryRepository';
import { Category } from '../models/category';
import { AppDataSource } from '../database/dataSource';
import { getRepository } from 'typeorm';
import { SubCategory } from '../models/subcategory';

// const createCategory = async (name: string) => {
//   return await categoryRepository.createCategory({ name });
// };

// const getAllCategories = async () => {
//   return await categoryRepository.getAllCategories();
// };

// export const getAllCategories = async (): Promise<Category[]> => {
//   const categoryRepository = AppDataSource.getRepository(Category);
//   return categoryRepository.find();
// };


// export const getCategoriesAndSubcategories = async () => {
//   const categoryRepository = getRepository(Category);
//   const subCategoryRepository = getRepository(SubCategory);

//   const categories = await categoryRepository.find();
//   const subcategories = await subCategoryRepository.find();

//   return { categories, subcategories };
// };

export const getCategoriesAndSubcategories = async () => {
  const categoryRepository = getRepository(Category);
  const result =  categoryRepository.find({ 
    relations: ['subCategories', 'subCategories.subSubCategories'] 
  });
  return result
};



// export default { createCategory };
