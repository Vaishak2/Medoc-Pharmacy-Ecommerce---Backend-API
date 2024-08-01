// src/app.ts
import express from 'express';
import bodyParser from 'body-parser';
import authRoutes from './routes/authRoutes';
import {authMiddleware} from '../src/middlewares/authMiddleware';//auth middleware to all protected routes
import userRoutes from './routes/userRoutes'
import productRoutes from './routes/productRoutes'
import categoryRoutes from './routes/categoryRoutes';
import bannerRoutes from './routes/bannerRoutes';
import topBrandsRoutes from './routes/topBrandsRoutes'
import dealRoutes from './routes/dealRoutes';
import subCategoryRoutes from './routes/subCategoryRoutes'
import offerRoutes from './routes/offerRoutes';
import wishlistRoutes from './routes/wishlistRoutes';
import addressRoutes from './routes/addressRoutes'
import couponRoutes from './routes/couponRoutes';
import locationRoutes from './routes/locationRoutes';
import cartRoutes from './routes/cartRoutes';
// import orderRoutes from './routes/orderRoutes';
import recentlyView from './routes/recentlyViewedRoutes'
import cors from 'cors';
import orderRoutes from './routes/orderRoutes';
import notificationRoutes from './routes/notificationRoutes';
import customerReviewRoutes from './routes/customerReviewRoutes';

const app = express();
// const express = require('express');
 
app.use(cors({
  origin: 'http://localhost:3000'
}));

app.use(bodyParser.json());
app.use('/api', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api', productRoutes);
app.use('/api', categoryRoutes);
app.use('/api', bannerRoutes); 
app.use('/api', topBrandsRoutes);
app.use('/api', dealRoutes); 
app.use('/api', subCategoryRoutes); 
app.use('/api', offerRoutes);
app.use('/api', wishlistRoutes);
app.use('/api', addressRoutes);
app.use('/api', couponRoutes);
app.use('/api', locationRoutes);
app.use('/api', cartRoutes);
app.use('/api', recentlyView);
app.use('/api', orderRoutes);
app.use('/api', notificationRoutes);
app.use('/api', customerReviewRoutes);



export default app;


// app.use('/api', userRoutes);
// app.use('/api',productRoutes);