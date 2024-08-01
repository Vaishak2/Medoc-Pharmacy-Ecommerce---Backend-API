// src/middleware/authMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { isBlacklisted } from '../utils/tokenBlacklist';


const verifyToken = (token: string) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, 'your_secret_key', (err, decoded) => {
      if (err) {
        reject(err);
      } else {
        resolve(decoded);
      }
    });
  });
};


export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  if (isBlacklisted(token)) {
    return res.status(401).json({ message: 'Token is blacklisted' });
  }

  try {
    await verifyToken(token as string);
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token', error: (error as Error).message });
  }
};

// As of now not requierd #################################
// const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
//   const authHeader = req.headers.authorization;

//   if (!authHeader || !authHeader.startsWith('Bearer ')) {
//     return res.status(401).json({ message: 'Authorization header missing or malformed' });
//   }

//   const token = authHeader.split(' ')[1];

//   if (isBlacklisted(token)) {
//     return res.status(403).json({ message: 'Token is blacklisted' });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET!);
//     req.user = decoded;
//     next();
//   } catch (error) {
//     return res.status(401).json({ message: 'Invalid or expired token' });
//   }
// };

// export default authMiddleware;
