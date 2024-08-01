// src/server.ts
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import dotenv from 'dotenv';
dotenv.config();

import app from './app'; // Import the Express app

const PORT = process.env.PORT || 5000;
// Implement better error handling for database connection failures
createConnection().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch(error => {
  console.error('Error connecting to the database', error);
});
