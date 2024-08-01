// src/controllers/authController.ts
import { Request, Response } from 'express';
import authService from '../services/authService';
import { loginService } from '../services/authService';

import { addToBlacklist } from '../utils/tokenBlacklist';

const register = async (req: Request, res: Response) => {
  const { username, phoneNumber, email, gender } = req.body;
  
  try {
    if (!username || !phoneNumber || !email || !gender) {
      throw new Error("Username, phoneNumber, and email are required");
    }
    const user = await authService.register(username, phoneNumber, email, gender);
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (err) {
    res.status(400).json({ message: (err as Error).message });
  }
};
export { register};
// ------------------------------------------------------------------------------------------------------
export const login = async (req: Request, res: Response) => {
  const { email, phoneNumber } = req.body;

  if (!email && !phoneNumber) {
    return res.status(400).json({ message: 'Either email or phone number is required' });
  }

  // Validate email if provided
  if (email && !validateEmail(email)) {
    return res.status(400).json({ message: 'Invalid email format' });
  }

  // Validate phone number if provided
  if (phoneNumber && !validatePhoneNumber(phoneNumber)) {
    return res.status(400).json({ message: 'Invalid phone number format' });
  }

  try {
    const result = await loginService(email, phoneNumber);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error: (error as Error).message });
  }
};

const validateEmail = (email: string) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

const validatePhoneNumber = (phoneNumber: string) => {
  const re = /^[0-9]{10,15}$/; // Assuming phone numbers are between 10 to 15 digits
  return re.test(phoneNumber);
};
// ------------------------------------------------------------------------------------------------------
export const logout = async (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(400).json({ message: 'Token is missing' });
  }

  try {
    await addToBlacklist(token); // Awaiting the async operation
    res.status(200).json({ message: 'Successfully logged out' });
  } catch (error) {
    res.status(500).json({ message: 'Error logging out', error: (error as Error).message });
  }
};


// const login = async (req: Request, res: Response) => {
//   const username = req.body;

//   try {
//     if (!username ) {
//       throw new Error("Username and phoneNumber are required");
//     }
//     const token = await authService.login(username);
//     res.status(200).json({ token });
//   } catch (err) {
//     res.status(400).json({ message: (err as Error).message });
//   }
// };

