// src/controllers/categoryController.ts
import { Request, Response } from 'express';
import subCategoryService from '../services/subcategoryServices';
import { getCategoriesByCategoryId } from '../services/subcategoryServices';


const createSubCategory = async (req: Request, res: Response) => {
  const { name } = req.body;

  try {
    if (!name) {
      throw new Error("Name is required");
    }
    const subCategory = await subCategoryService.createSubCategory(name);
    res.status(201).json({ message: 'Category created successfully', subCategory });
  } catch (err) {
    res.status(400).json({ message: (err as Error).message });
  }
};


export const getSubCategories = async (req: Request, res: Response) => {
  const { categoryId } = req.params;
  try {
    const categories = await getCategoriesByCategoryId(Number(categoryId));
    res.json({
      message:"Success",
      category:categories
  });
  } catch (error) {
    res.status(500).json({ 
      massage:false,
      error: (error as Error).message
     });
  }
};


export { createSubCategory };
