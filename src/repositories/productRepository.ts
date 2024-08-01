// src/repositories/productRepository.ts
import { getRepository } from 'typeorm';
// import Product from '../models/product';
import { EntityRepository, Repository } from 'typeorm';
import { Product } from '../models/product';

const createProduct = async (productData: Partial<Product>) => {
  const productRepository = getRepository(Product);
  const product = productRepository.create(productData);
  await productRepository.save(product);
  return product;
};

const getAllProducts = async () => {
  const productRepository = getRepository(Product);
  return await productRepository.find({ relations: ['category'] });
};

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {}


export default { createProduct, getAllProducts };
