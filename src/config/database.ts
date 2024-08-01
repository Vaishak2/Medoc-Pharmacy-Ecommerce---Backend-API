import { DataSource } from 'typeorm';
import { User } from '../models/user';
import { Product } from '../models/product';
import { Category } from '../models/category';
import { Address } from '../models/address';
import config from './env'; // Import the whole config object

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: config.DB_HOST,
  port: config.DB_PORT,
  username: config.DB_USER,
  password: config.DB_PASSWORD,
  database: config.DB_NAME,
  entities: [User, Product, Category, Address],
  synchronize: true,
});
