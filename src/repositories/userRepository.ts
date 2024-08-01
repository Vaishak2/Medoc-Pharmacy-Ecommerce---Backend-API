// src/repositories/userRepository.ts
import { getRepository } from 'typeorm';
import {User} from '../models/user';
import bcrypt from 'bcryptjs';

const createUser = async (userData: { username: string; password: string; email: string; gender: string; }) => {
  const userRepository = getRepository(User);
  const hashedPassword = await bcrypt.hash(userData.password, 10);
  const user = userRepository.create({ ...userData, password: hashedPassword });
  await userRepository.save(user);
  return user;
};

const findUserByUsername = async (username: string) => {
  const userRepository = getRepository(User);
  return await userRepository.findOne({ where: { username } });
};

const findUserByEmail = async (email: string) => {
  const userRepository = getRepository(User);
  return await userRepository.findOne({ where: { email } });
};

const getAllUsers = async () => {
  const userRepository = getRepository(User);
  return await userRepository.find({
    select: ['id', 'username', 'email', 'phoneNumber','gender'],
  });;
};

const findUserById = async (id: number) => {
  return await getRepository(User).findOne({ where: { id } });
};



export default { createUser, findUserByUsername, findUserByEmail, getAllUsers, findUserById };
