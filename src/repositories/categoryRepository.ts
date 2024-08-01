// src/repositories/categoryRepository.ts
import { getRepository } from 'typeorm';
// import Category from '../models/category';
import { EntityRepository, Repository } from 'typeorm';
import { Category } from '../models/category';

// const createCategory = async (categoryData: Partial<Category>) => {
//   const categoryRepository = getRepository(Category);
//   const category = categoryRepository.create(categoryData);
//   await categoryRepository.save(category);
//   return category;
// };

// const getAllCategories = async () => {
//   const categoryRepository = getRepository(Category);
//   return await categoryRepository.find({ });
// };

@EntityRepository(Category)
export class CategoryRepository extends Repository<Category> {}

// export default { createCategory, getAllCategories };
