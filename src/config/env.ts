import dotenv from 'dotenv';

dotenv.config();

const config = {
  PORT: process.env.PORT || 3000,
  DB_HOST: process.env.DB_HOST || '194.238.23.134',
  DB_USER: process.env.DB_USER || 'postgres',
  DB_PASSWORD: process.env.DB_PASSWORD || '123456',
  DB_NAME: process.env.DB_NAME || 'db_medo_pharm',
  DB_PORT: Number(process.env.DB_PORT) || 5432,
};

export default config;
