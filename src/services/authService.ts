// src/services/authService.ts
import userRepository from '../repositories/userRepository';
import { getRepository } from 'typeorm';
import {User} from '../models/user';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const register = async (username: string, password: string, email: string, gender:string ) => {
  const existingUser = await userRepository.findUserByUsername(username);
  if (existingUser) {
    throw new Error('Username already taken');
  }

  const existingEmail = await userRepository.findUserByEmail(email);
  if (existingEmail) {
    throw new Error('Email already registered');
  }

  const user = await userRepository.createUser({ username, password, email, gender });
  return user;
};

export default {  register };


export const loginService = async (email: string, phoneNumber: string) => {
  const userRepository = getRepository(User);

  const user = await userRepository.createQueryBuilder('user')
    .where('user.email = :email', { email })
    .orWhere('user.phoneNumber = :phoneNumber', { phoneNumber })
    .getOne();

  if (!user) {
    throw new Error('User not found');
  }
 
  if (user.userStatus !== 'active') {
    throw new Error('User account is inactive');
  }

  if (user.email !== email && user.phoneNumber !== phoneNumber) {
    throw new Error('Invalid credentials');
  }

  const token = jwt.sign({ id: user.id, email: user.email }, 'your_secret_key', { expiresIn: '1h' });

  return {
    message: 'Login successful',
    user_id: user.id,
    token,
  };
};
