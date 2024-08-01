// src/controllers/productController.ts
import { Request, Response } from 'express';
import productService from '../services/productService';
// import { getProductsBysubcategory_id } from '../services/productService';
import { Any, getRepository } from 'typeorm';
import { getProductsAndSubSubCategories, getProductsByBrandId , getProductById, searchProducts ,getSimilarProducts, filterProducts} from '../services/productService';
import { Address } from '../models/address';



const createProduct = async (req: Request, res: Response) => {
  const { name, price, description, categoryId , subcategory_id ,is_wishlist,image_url } = req.body;

  try {
    if (!name || !price || !categoryId) {
      throw new Error("Name, price, and category ID are required");
    }
    const product = await productService.createProduct(name, price, description, categoryId ,subcategory_id,is_wishlist,image_url);
    res.status(201).json({ message: 'Product created successfully', product });
  } catch (err) {
    res.status(400).json({ message: (err as Error).message });
  }
};

const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await productService.getAllProducts();
    res.status(200).json({
        message :" Success",
        products: products
      });
  } catch (err) {
    res.status(400).json({ 
      massage:false,
      message: (err as Error).message
     });
  }
};


// export const getProducts = async (req: Request, res: Response) => {
//   const { subcategory_id } = req.params;
//   const page = parseInt(req.params.pageNumber, 10) || 1;
//         const pageSize = 10; // Define the number of items per page
//   try {
//     const [products, total] = await getProductsBysubcategory_id(parseInt(subcategory_id, 10), page, pageSize);
//     res.json({
//       message :" Success",
//       data: products,
//       meta: {
//         total,
//         page,
//         pageSize,
//         totalPages: Math.ceil(total  / pageSize),
//     },
//     });
//   } catch (error) {
//     res.status(500).json({ error: (error as Error).message });
//   }
// };


export const getProducts = async (req: Request, res: Response) => {
  try {
    const filters = req.body;

    const result = await getProductsAndSubSubCategories(filters);

    res.json({
      message: 'Success',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching products',
      error: (error as Error).message,
    });
  }
};

export const getProductsByBrand = async (req: Request, res: Response) => {
    try {
      const { brandId, pageNumber, sortBy='' } = req.params;
  
      const { products, total, pageSize } = await getProductsByBrandId(
        Number(brandId),
        Number(pageNumber),
        sortBy
      );
  
      res.status(200).json({
        message: 'Success',
        data: { products, total, pageNumber: Number(pageNumber), pageSize },
      });
    } catch (error) {
      res.status(500).json({
        message: 'Error fetching products by brandId',
        error,
      });
    }
};


export const getProduct = async (req: Request, res: Response) => {
  try {
    const { productId , userId } = req.params;
    const productIdNumber = parseInt(productId);
    const parseIntUserId = parseInt(userId);

    if (isNaN(productIdNumber)) {
      return res.status(400).json({ message: 'Invalid productId' });
    }

    const product = await getProductById(parseIntUserId, productIdNumber);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const addressRepository = getRepository(Address);
    const address = await addressRepository.findOne({
      where: {
        user: { id: parseIntUserId },
        isselected: true,
      },
    });

    if (!address) {
      return res.status(404).json({ message: 'Address not found for the user' });
    }

    res.status(200).json({
      message: 'Success',
      data: {
        product:product,
        address: address,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching product',
      error,
    });
  }
};

export const searchProduct = async (req: Request, res: Response) => {
  try {
    const { searchKeyWord } = req.params || '';

    const products = await searchProducts(searchKeyWord);

    res.status(200).json({
      message: 'Success',
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error searching products',
      error,
    });
  }
};

export const fetchSimilarProducts = async (req: Request, res: Response) => {
  try {
    const { subcategoryId, pageNumber } = req.params;

    const { products, total, pageSize } = await getSimilarProducts(Number(subcategoryId), Number(pageNumber));

    res.status(200).json({
      message: 'Success',
      data: { products, total, pageNumber: Number(pageNumber), pageSize },
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching similar products',
      error,
    });
  }
};

// export const filterProductsController = async (req: Request, res: Response) => {
//   try {
//     const { brands, startPrice, endPrice } = req.body;

//     if (!brands || !Array.isArray(brands) ) {
//       return res.status(400).json({
//         message: 'Invalid brands array',
//       });
//     }

//     if (
//       startPrice === undefined ||
//       endPrice === undefined ||
//       isNaN(startPrice) ||
//       isNaN(endPrice)
//     ) {
//       return res.status(400).json({
//         message: 'Invalid price range',
//       });
//     }

//     const products = await filterProducts({ brands, startPrice, endPrice });

//     res.json({
//       message: 'Success',
//       data: products,
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: 'Error fetching filtered products',
//       error: (error as Error).message,
//     });
//   }
// };

export { createProduct, getAllProducts };
