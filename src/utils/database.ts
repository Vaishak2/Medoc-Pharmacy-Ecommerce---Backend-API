 
// // src/utils/database.ts
// import 'reflect-metadata';
// import { DataSource } from 'typeorm';
// import dotenv from 'dotenv';
// // import User from '../models/user';
// import Banner from '../models/banner';
// import Category from '../models/category';
// import Product from '../models/product';

// dotenv.config();

// const AppDataSource = new DataSource({
//   type: 'postgres',
//   host: process.env.DB_HOST,
//   port: parseInt(process.env.DB_PORT!, 10),
//   username: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
//   synchronize: true,
//   logging: false,
//   entities: [ Banner, Category, Product],
//   migrations: [],
//   subscribers: [],
// });

// export default AppDataSource;
