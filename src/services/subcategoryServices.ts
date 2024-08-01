// src/services/subcategoryService.ts
import subcategoryRepository from '../repositories/subcategoryRepository';
import { getRepository } from 'typeorm';
import { SubCategory } from '../models/subcategory';
import { SubCategoryResponse } from '../types/SubCategoryResponse';

const createSubCategory = async (name: string) => {
  return await subcategoryRepository.createSubCategory({ name });
};

const getAllSubCategories = async (category_id: any) => {
  return await subcategoryRepository.getAllSubCategories(category_id);
};


export async function getSubCategoriesByCategoryId(categoryId: number): Promise<SubCategoryResponse[]> {
  const subCategoryRepository = getRepository(SubCategory);

  try {
    // Find subcategories with products eagerly loaded
    const subCategories = await subCategoryRepository.find({
      where: { category: { id: categoryId } }, // Ensure category is correctly referenced
      relations: ['products'] // Assuming you have 'products' relation in SubCategory entity
    });

    return subCategories.map(subCategory => ({
      id: subCategory.id,
      name: subCategory.name,
      createdAt: subCategory.createdAt,
      updatedAt: subCategory.updatedAt,
    }));
  } catch (error) {
    throw new Error(`Failed to fetch subcategories: ${error}`);
  }
}


export default { createSubCategory, getAllSubCategories };
