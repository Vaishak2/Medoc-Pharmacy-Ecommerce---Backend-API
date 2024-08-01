import { getRepository } from 'typeorm';
import { Product } from '../models/product';
import { Top_brands } from '../models/topBrands'
import topBrandsRepository from '../repositories/topBrandsRepository';


// const gettopBrandsUrls = async () => {
//   return await topBrandsRepository.getTopBrands();
// };

export const gettopBrandsUrls = async (searchKeyWord?: string) => {
  const brandRepository = getRepository(Top_brands);
  const productRepository = getRepository(Product);

  // const brands = await brandRepository.find();

  const queryBuilder = brandRepository.createQueryBuilder('brand');
  if (searchKeyWord) {
    queryBuilder.where('LOWER(brand.brand_name) LIKE LOWER(:searchKeyWord)', {
      searchKeyWord: `%${searchKeyWord}%`,
    });
  }

  const brands = await queryBuilder.getMany();

  const brandsWithProductCount = await Promise.all(
    brands.map(async (brand) => {
      const totalProducts = await productRepository.count({
        where: {
          brand: {
            id: brand.id,
          },
        },
      });
      return {
        ...brand,
        totalProducts,
      };
    })
  );

  return brandsWithProductCount;
};

export const getFilterListing = async (searchKeyWord: string = '') => {
  const brandRepository = getRepository(Top_brands);
  const productRepository = getRepository(Product);

  // Fetch brands with total product count
  const brands = await brandRepository.createQueryBuilder('brand')
    .leftJoinAndSelect('brand.products', 'product')
    .loadRelationCountAndMap('brand.totalProducts', 'brand.products', 'products')
    .where('brand.brand_name LIKE :searchKeyWord', { searchKeyWord: `%${searchKeyWord}%` })
    .getMany();

    const brandsWithProductCount = await Promise.all(
      brands.map(async (brand) => {
        const totalProducts = await productRepository.count({
          where: {
            brand: {
              id: brand.id,
            },
          },
        });
        return {
          ...brand,
          totalProducts,
        };
      })
    );

  // Fetch product count in different price ranges
  const priceRanges = [
    { range: 'Below 500', count: 0, min: 0, max: 500 },
    { range: '500-1000', count: 0, min: 500, max: 1000 },
    { range: '1000-1500', count: 0, min: 1000, max: 1500 },
  ];

  let totalProducts = await productRepository.count();

  for (const range of priceRanges) {
    range.count = await productRepository.createQueryBuilder('product')
      .where('product.price >= :min AND product.price < :max', { min: range.min, max: range.max })
      .getCount();
  }

  return { brandsWithProductCount, priceRanges , totalProducts};
};

const addtopBrandsUrls = async (logo_url: string, brand_name: string ) => {
    return await topBrandsRepository.createTopBrands({ logo_url, brand_name });
  };

export default { gettopBrandsUrls, addtopBrandsUrls };
