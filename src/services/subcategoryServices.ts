// src/services/subcategoryService.ts
import subcategoryRepository from '../repositories/subcategoryRepository';
import { getRepository } from 'typeorm';
import { SubCategory } from '../models/subcategory';
import { SubCategoryResponse } from '../types/SubCategoryResponse';
import { Category } from '../models/category';

const createSubCategory = async (name: string) => {
  return await subcategoryRepository.createSubCategory({ name });
};

const getAllSubCategories = async (category_id: any) => {
  return await subcategoryRepository.getAllSubCategories(category_id);
};


export async function getCategoriesByCategoryId(categoryId: number): Promise<SubCategoryResponse[]> {
  const categoryRepository = getRepository(Category);


  try {
    const result = await categoryRepository.find({
      where: { id: categoryId }, // Directly use the categoryId for the id field
      relations: ['subCategories', 'subCategories.subSubCategories'],
    });

    // return subCategories.map(subCategory => ({
    //   id: subCategory.id,
    //   name: subCategory.name,
    //   createdAt: subCategory.createdAt,
    //   updatedAt: subCategory.updatedAt,
    // }));
    return  result
  } catch (error) {
    throw new Error(`Failed to fetch subcategories: ${error}`);
  }
}


export default { createSubCategory, getAllSubCategories };
