import { DataSource } from 'typeorm';
import { Category } from '../models/category';
import { SubCategory } from '../models/subcategory';
import { Product } from '../models/product';
import { SubSubCategory } from '../models/subSubCategory';
import { Address } from '../models/address';
import {Top_brands } from '../models/topBrands'
import { Carts } from '../models/cart';
import { User } from '../models/user';
import { Wishlist } from '../models/wishlistModel';
import Deal from '../models/dealModel';
import { RecentlyViewed } from '../models/recentlyViewed';
import { Order } from '../models/orderModel';
import Notification from '../models/notificationModel';
import CustomerReview from '../models/customerReview';
import Offer from '../models/offerModel';
import { Return } from '../models/order_return';
import { CustomerReviewLike } from '../models/customerReviewLikes';

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: '194.238.23.134',
    port: 5432,
    username: 'postgres',
    password: '123456',
    database: 'db_medo_pharm',
    entities: [Category, SubCategory, SubSubCategory, Product,Top_brands, Carts, User,Wishlist , Deal, Order, RecentlyViewed,Notification,Address, CustomerReview,Offer,Return,CustomerReviewLike], 
    migrations: ["src/migrations/*.ts"],
    synchronize: true,  // Use this in development, set to false in production and use migrations
    logging: false,
    subscribers: [],
});

AppDataSource.initialize()
    .then(() => {
        console.log('Data Source has been initialized!');
    })
    .catch((err) => {
        console.error('Error during Data Source initialization:', err);
    });
