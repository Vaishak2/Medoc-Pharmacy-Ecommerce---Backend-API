// src/app.ts
import express from 'express';
import fs from 'fs';
import https from 'https';
import http from 'http';
import path from 'path';
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
import bulkUploadRoutes from './routes/productBulkUploadRoutes';
import otpRoutes from './routes/otpRoutes';
import setupProxy from './setupProxy';
import { createProxyMiddleware } from 'http-proxy-middleware';

const app = express();
// setupProxy(app); 
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3002',
  'https://www.solwyztest.com'
];

// app.use((req, res, next) => {
//   const origin = req.headers.origin as string;
//   if (allowedOrigins.includes(origin)) {
//     res.header('Access-Control-Allow-Origin', origin);
//   }
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//   next();
// });

// app.use(
//   '',
//   createProxyMiddleware({
//     target: 'http://194.238.23.134:3000',
//     changeOrigin: true,
//   })
// );
// Allow CORS for all origins (not recommended for production)
// app.use(cors({
//   origin: ['http://localhost:3000', 'http://localhost:3001', 'https://www.solwyztest.com'],
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
// }));
app.use(cors());


// app.use(cors({
//   origin:['http://localhost:3000', 'http://localhost:3001', 'https://www.solwyztest.com'], // Allow requests only from your React domain
//   methods: 'GET,POST,PUT,DELETE',       // Specify the allowed methods
//   credentials: true                     // If you need to send cookies or auth headers
// }));


// module.exports = function (app: any) {
//   app.use(
//     '',
//     createProxyMiddleware({
//       target: 'https://www.medocpharm.com',
//       changeOrigin: true,
//       secure: false,
//     })
//   );
// };

// const corsOptions = {
//   origin: 'https://medocpharm.com',
//   optionsSuccessStatus: 200
// };
// app.use(cors(corsOptions));

app.use(bodyParser.json());  
app.use('/api', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api', bulkUploadRoutes);
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
app.use('/api', otpRoutes);


// Determine if the environment is local or production
const isProduction = process.env.NODE_ENV === 'production';

if (isProduction) {
  // Path to SSL certificates on the VPS
  const sslOptions = {
    key: fs.readFileSync('/path/to/selfsigned.key'),
    cert: fs.readFileSync('/path/to/selfsigned.crt'),
  };

  // Create HTTPS server
  https.createServer(sslOptions, app).listen(3000, () => {
    console.log('Node.js server running on port 3000 with HTTPS');
  });

  // Redirect HTTP to HTTPS
  http.createServer((req, res) => {
    res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url });
    res.end();
  }).listen(80, () => {
    console.log('HTTP to HTTPS redirect server running on port 80');
  });
} else {
  // Local development: use HTTP
  http.createServer(app).listen(3001, () => {
    console.log('Node.js server running on port 3000 with HTTP (local development)');
  });
}


export default app;


// app.use('/api', userRoutes);
// app.use('/api',productRoutes);