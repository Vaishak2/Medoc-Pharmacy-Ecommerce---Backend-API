// src/controllers/userController.ts
import { Request, Response } from 'express';
import userService from '../services/userService';
import userRepository from '../repositories/userRepository';
import { getRepository } from 'typeorm';
import { User } from '../models/user';


export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

// --------------------------------------------------------------------------------------------------------

const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const user = await userRepository.findUserById(parseInt(id));

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Remove the password before sending the response
    const { password, ...userWithoutPassword } = user;

    res.status(200).json(userWithoutPassword);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving user', error: (err as Error).message });
  }
};
export { getUserById };

// --------------------------------------------------------------------------------------------------------

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { username, email, phoneNumber, gender, address } = req.body;

  try {
    const userRepository = getRepository(User);
    const user = await userRepository.findOne({ where: { id: Number(id) } });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.username = username || user.username;
    user.email = email || user.email;
    user.phoneNumber = phoneNumber || user.phoneNumber;
    user.gender = gender || user.gender;
    // user.address = address || user.address;

    await userRepository.save(user);
    res.status(200).json({
      message: 'User updated successfully',
      data: user,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating user', error });
  }
};

// --------------------------------------------------------------------------------------------------------

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { reason , comments } = req.body; // Reason for deletion from the request body

  try {
    const userRepository = getRepository(User);
    const user = await userRepository.findOne({ where: { id: Number(id) } });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.userStatus = 'inactive';
    user.reason_for_delete = reason;
    user.comments = comments

    await userRepository.save(user);
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deactivating user', error });
  }
};

// --------------------------------------------------------------------------------------------------------
