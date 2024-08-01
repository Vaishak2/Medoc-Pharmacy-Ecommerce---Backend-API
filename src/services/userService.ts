// src/services/userService.ts
import userRepository from '../repositories/userRepository';

const createUser = async (username: string, password: string, email: string, gender:string) => {
  return await userRepository.createUser({ username, password, email, gender });
};

const getAllUsers = async () => {
  return await userRepository.getAllUsers();
};

export default { createUser, getAllUsers };
