import { Request, Response } from 'express';
import topBrandsService, { getFilterListing } from '../services/topBrandsService';

const createTopBrands = async (req: Request, res: Response) => {
  const { logo_url, brand_name} = req.body;

  try {
    if (!logo_url || !brand_name ) {
      throw new Error("Logo, Brand_Name are required");
    }
    const top_brands = await topBrandsService.addtopBrandsUrls(logo_url, brand_name);
    res.status(201).json({ message: 'Top Brands created successfully', top_brands });
  } catch (err) {
    res.status(400).json({ message: (err as Error).message });
  }
};

const getAlltopBrands = async (req: Request, res: Response) => {
  try {
    const searchKeyWord = req.params.searchKeyWord || '';
    const brands = await topBrandsService.gettopBrandsUrls(searchKeyWord);
    res.status(200).json({
      message : "Success",
      data : brands
       });
  } catch (err) {
    res.status(400).json({
       massage:false,
       error: (err as Error).message
      });
  }
};

export const filterListingController = async (req: Request, res: Response) => {
  try {
    const { searchKeyWord } = req.query;

    const { brandsWithProductCount, priceRanges , totalProducts } = await getFilterListing(searchKeyWord as string);

    res.json({
      message: 'Success',
      data: {
        brands: brandsWithProductCount.map(brand => ({
          id: brand.id,
          logo_url: brand.logo_url,
          brand_name: brand.brand_name,
          totalProducts: brand.totalProducts,
        })),
        priceListing: priceRanges.map(range => ({
          priceRange: range.range,
          countOfProducts: range.count,
          min : range.min,
          max : range.max
        })),
        totalProducts: totalProducts
      },
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching filtered products',
      error: (error as Error).message,
    });
  }
};

export { createTopBrands, getAlltopBrands };
