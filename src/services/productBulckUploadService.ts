import fs from 'fs';
import csvParser from 'csv-parser';
import { getRepository } from 'typeorm';
import { Category } from '../models/category';
import { SubCategory } from '../models/subcategory';
import { SubSubCategory } from '../models/subSubCategory';
import { Product } from '../models/product';

export const bulkUploadService = async (filePath: string) => {
    const categoryRepository = getRepository(Category);
    const subCategoryRepository = getRepository(SubCategory);
    const subSubCategoryRepository = getRepository(SubSubCategory);
    const productRepository = getRepository(Product);

    const results: any[] = [];
    

    return new Promise<void>((resolve, reject) => {
        fs.createReadStream(filePath)
            .pipe(csvParser())
            .on('data', (data) => results.push(data))
            .on('end', async () => {
                try {
                    for (const row of results) {
                        const category = await categoryRepository.findOne({ where: { name: row.category } });
                        const subCategory = await subCategoryRepository.findOne({ where: { name: row.subCategory } });
                        const subSubCategory = await subSubCategoryRepository.findOne({ where: { name: row.subSubCategory } });

                        if (!category || !subCategory || !subSubCategory) {
                            throw new Error('Invalid category or subcategory details');
                        }

                        const product = new Product();
                        product.name = row.productName;
                        product.price = parseFloat(row.price);
                        product.category = category;
                        product.subCategory = subCategory;
                        product.subSubCategory = subSubCategory;

                        await productRepository.save(product);
                    }
                    resolve();
                } catch (error) {
                    reject(error);
                } finally {
                    fs.unlinkSync(filePath); // Remove file after processing
                }
            });
    });
};
