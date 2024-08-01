// src/controllers/categoryController.ts
import { Request, Response } from 'express';
// import categoryService from '../services/categoryService';
// import { getAllCategories } from '../services/categoryService';
import { getCategoriesAndSubcategories } from '../services/categoryService';

// const createCategory = async (req: Request, res: Response) => {
//   const { name } = req.body;

//   try {
//     if (!name) {
//       throw new Error("Name is required");
//     }
//     const category = await categoryService.createCategory(name);
//     res.status(201).json({ message: 'Category created successfully', category });
//   } catch (err) {
//     res.status(400).json({ message: (err as Error).message });
//   }
// };

// const getAllCategories = async (req: Request, res: Response) => {
//   try {
//     const categories = await categoryService.getAllCategories();
//     res.status(200).json({ 
//       message : "Success",
//       categories
//      });
//   } catch (err) {
//     res.status(400).json({ message: (err as Error).message });
//   }
// };

// export const getCategories = async (req: Request, res: Response) => {
//   try {
//     const categories = await getAllCategories();
//     res.json({
//       message:"success",
//       category: categories
//   });
//   } catch (error) {
//     res.status(500).json({ 
//       massage:false,
//       error: (error as Error).message 
//     });
//   }
// };

// export const getCategories = async (req: Request, res: Response) => {
//   try {
//       const categories = await getAllCategories();
//       res.json({
//         message:"success",
//         category: categories
//     });
//   } catch (error) {
//     res.status(500).json({ 
//       massage:false,
//       error: (error as Error).message 
//     });
//   }
// };


export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await getCategoriesAndSubcategories();
    res.json({
      message: 'Success',
      data: categories.map(category => ({
        id: category.id,
        name: category.name,
        description: category.description,
        image_url: category.image_url,
        createdAt: category.createdAt,
        updatedAt: category.updatedAt,
        subCategories: category.subCategories.map(subCategory => ({
          id: subCategory.id,
          name: subCategory.name,
          createdAt: subCategory.createdAt,
          updatedAt: subCategory.updatedAt,
          categoryId: subCategory.categoryId,
          image_url: subCategory.image_url,
          subSubCategories: subCategory.subSubCategories.map(subSubCategory => ({
            id: subSubCategory.id,
            name: subSubCategory.name,
            image_url: subSubCategory.image_url,
            subCategoryId: subSubCategory.subcategoryId,
            createdAt: subSubCategory.createdAt,
            updatedAt: subSubCategory.updatedAt,
          }))
        }))
      }))
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching categories and subcategories',
      error
    });
  }
};


// export { createCategory, getAllCategories };
