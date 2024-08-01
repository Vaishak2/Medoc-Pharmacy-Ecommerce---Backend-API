// src/services/productService.ts
import productRepository from '../repositories/productRepository';
import { getRepository, Like } from 'typeorm';
import { Product } from '../models/product';
import { IProduct } from '../types/IProduct';
import { AppDataSource } from '../database/dataSource';
import { SubSubCategory } from '../models/subSubCategory';
import { addRecentlyViewed } from './recentlyViewedService';
import SubCategory from '../models/subcategory';
import { Wishlist } from '../models/wishlistModel';
import { Carts } from '../models/cart';
import { getAvailableOffersByUserId } from './offerService';

interface FilterOptions {
  userId : number;
  subCategoryId?: number;
  subSubCategoryId?:number;
  pageNumber: number;
  sortBy?: string;
  searchKeyWord?: string;
  brands?: string[];
  startPrice?: number;
  endPrice?: number;
}

const createProduct = async (name: string, price: number, description: string, categoryId: number ,subcategory_id:number ,is_wishlist : boolean, image_url: string) => {
  return await productRepository.createProduct({ name, price, description, categoryId ,subcategory_id,is_wishlist,image_url });
};

const getAllProducts = async () => {
  return await productRepository.getAllProducts(); 
};

// export async function getProductsBysubcategory_id(subcategory_id: number, page: number, pageSize: number): Promise<[IProduct[],Number]> {
//   // const productRepository = getRepository(Product);
//   const productRepository = AppDataSource.getRepository(Product);

//   try {
//     // Find products with the specified subcategory ID
//     const [products, total] = await productRepository.findAndCount({
//       where: { subCategory: { id: subcategory_id } },
//       skip: (page - 1) * pageSize,
//       take: pageSize,
//   });


//   const mappedProducts = products.map(product => ({
//     id: product.id,
//     name: product.name,
//     description: product.description,
//     price: product.price,
//     stockQuantity: product.stockQuantity,
//     categoryId: product.categoryId,
//     subcategory_id: product.subcategory_id,
//     is_wishlist: product.is_wishlist,
//     image_url: product.image_url,
//   }));
  
//   return [ mappedProducts, total ];

//   } catch (error) {
//     throw new Error(`Failed to fetch products: ${error}`);
//   }
// }


export const getProductsBySubSubCategoryId = async (
  subSubCategoryId: number,
  pageNumber: number,
  searchKeyWord: string
) => {
  try {
    if (!AppDataSource.isInitialized) {
      throw new Error('Data Source not initialized');
    }
  
    const productRepository = AppDataSource.getRepository(Product);
    const pageSize = 10;
    const skip = (pageNumber - 1) * pageSize;
  
    const [products, total] = await productRepository.findAndCount({
      where: searchKeyWord
        ? { subSubCategory: { id: subSubCategoryId }, name: Like(`%${searchKeyWord}%`) }
        : { subSubCategory: { id: subSubCategoryId } },
      take: pageSize,
      skip,
    });
  
    return {
      products,
      total,
      pageNumber,
      pageSize,
    };
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const getProductsAndSubSubCategories = async (filters: FilterOptions) => {
  const { userId, subCategoryId, subSubCategoryId, pageNumber, sortBy, searchKeyWord, brands, startPrice, endPrice } = filters;

  const productRepository = getRepository(Product);
  const subSubCategoryRepository = getRepository(SubSubCategory);
  const wishlistRepository = getRepository(Wishlist);
  const cartRepository = getRepository(Carts);

  const pageSize = 10;
  const skip = (pageNumber - 1) * pageSize;

  const query = productRepository.createQueryBuilder('product')
    .leftJoinAndSelect('product.subSubCategory', 'subSubCategory')
    .leftJoinAndSelect('product.brand', 'brand');

  if (subCategoryId) {
    query.where('product.subCategoryId = :subCategoryId', { subCategoryId });
  }

  if (subSubCategoryId) {
    query.where('product.subSubCategoryId = :subSubCategoryId', { subSubCategoryId });
  }

  if (searchKeyWord) {
    query.andWhere('LOWER(product.name) LIKE LOWER(:searchKeyWord)', { searchKeyWord: `%${searchKeyWord.toLowerCase()}%` });
  }

  if (brands && brands.length > 0) {
    query.andWhere('brand.brand_name IN (:...brands)', { brands });
  }
  if (startPrice) {
    query.andWhere('product.price >= :startPrice', { startPrice });
  }
  if (endPrice) {
    query.andWhere('product.price <= :endPrice', { endPrice });
  }

  let order: any = {};
  switch (sortBy) {
    case 'newest':
      order = { 'product.createdAt': 'DESC' };
      break;
    case 'lowToHigh':
      order = { 'product.price': 'ASC' };
      break;
    case 'highToLow':
      order = { 'product.price': 'DESC' };
      break;
    case 'rating':
      order = { 'product.rating': 'DESC' };
      break;
    default:
      order = { 'product.createdAt': 'DESC' };
  }

  const [products, total] = await query
    .orderBy(order)
    .skip(skip)
    .take(pageSize)
    .getManyAndCount();

  let subSubCategories;

  if (subCategoryId) {
    subSubCategories = await subSubCategoryRepository.createQueryBuilder('subSubCategory')
      .where('subSubCategory.subCategoryId = :subCategoryId', { subCategoryId })
      .getMany();
  }

  if (userId) {
    const wishlistProducts = await wishlistRepository.find({
      where: { user: { id: userId } },
      relations: ['product'],
    });

    const cartProducts = await cartRepository.find({
      where: { user: { id: userId } },
      relations: ['product'],
    });

    const wishlistProductIds = wishlistProducts.map(wishlistItem => wishlistItem.product.id);
    const cartProductIds = cartProducts.map(cartItem => cartItem.product.id);


    products.forEach(product => {
      product.is_wishlist = wishlistProductIds.includes(product.id);
      product.isCart = cartProductIds.includes(product.id);
    });
  }

  return {
    products,
    subSubCategories,
    total,
    pageNumber,
    pageSize
  };
};


export const getProductsByBrandId = async (
  brandId: number,
  pageNumber: number,
  sortBy?: string,
  pageSize: number = 10
) => {
  const productRepository = getRepository(Product);

  let order: any = {};
  switch (sortBy) {
    case 'newest':
      order = { createdAt: 'DESC' };
      break;
    case 'lowToHigh':
      order = { price: 'ASC' };
      break;
    case 'highToLow':
      order = { price: 'DESC' };
      break;
    case 'rating':
      order = { rating: 'DESC' };
      break;
    default:
      order = { createdAt: 'DESC' };
  }

  const [products, total] = await productRepository.findAndCount({
    where: { brand: {id:brandId }},
    order,
    skip: (pageNumber - 1) * pageSize,
    take: pageSize,
  });

  return { products, total, pageNumber, pageSize };
};

export const getProductById = async (userId: number, productId: number) => {
  const productRepository = getRepository(Product);
  
  const product = await productRepository.findOne({
    where: { id: productId },
    relations: ['brand', 'subCategory', 'subSubCategory'],
  });
  
  const transformedProduct = {
    ...product,
    size: product!.size ? product!.size.split(',').map(size => size.trim()) : [],
    images: product!.images ? product!.images.split(',').map(images => images.trim()) : [],
  };
  await addRecentlyViewed(userId, productId);
  const availableOffers = await getAvailableOffersByUserId(userId);

  return {...transformedProduct,availableOffers};
};

export const searchProducts = async (searchKeyWord?: string) => {
  const productRepository = getRepository(Product);

  let products;
  if (searchKeyWord) {
    const lowerCaseKeyword = searchKeyWord.toLowerCase();
    products = await productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.brand', 'brand')
      .leftJoinAndSelect('product.subCategory', 'subCategory')
      .leftJoinAndSelect('product.subSubCategory', 'subSubCategory')
      .where('LOWER(product.name) LIKE :name', { name: `%${lowerCaseKeyword}%` })
      .getMany();
  } else {
    products = await productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.brand', 'brand')
      .leftJoinAndSelect('product.subCategory', 'subCategory')
      .leftJoinAndSelect('product.subSubCategory', 'subSubCategory')
      .getMany();
  }

  return products;
};

export const getSimilarProducts = async (subCategoryId: number, pageNumber: number, pageSize: number = 10) => {
  const productRepository = getRepository(Product);

  const [products, total] = await productRepository.findAndCount({
    where: { subCategory: { id: subCategoryId } },
    skip: (pageNumber - 1) * pageSize,
    take: pageSize,
  });

  return { products, total, pageNumber, pageSize };
};


// export const filterProducts = async ({ brands, startPrice, endPrice }: FilterOptions) => {
//   const productRepository = getRepository(Product);

//   const queryBuilder = productRepository.createQueryBuilder('product');

//   if (brands && brands.length > 0) {
//     queryBuilder.andWhere('product.brandName IN (:...brands)', { brands });
//   }

//   if (startPrice !== undefined && endPrice !== undefined && !isNaN(startPrice) && !isNaN(endPrice)) {
//     queryBuilder.andWhere('product.price BETWEEN :startPrice AND :endPrice', { startPrice, endPrice });
//   }

//   const products = await queryBuilder.getMany();

//   return products;
// };

export default { createProduct, getAllProducts };
