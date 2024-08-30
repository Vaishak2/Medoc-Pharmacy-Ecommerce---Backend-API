import { Request, Response } from 'express';
import { sendOtp, verifyOtp } from '../repositories/otpRepository';
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'your_secret_key'; // Replace with your actual secret key

export const sendOTP = async (req: Request, res: Response) => {
  const { mobileNumber, email } = req.body;

  if (!mobileNumber && !email) {
    return res.status(400).json({ message: 'Either mobileNumber or email is required' });
  }

  try {
    const result = await sendOtp(mobileNumber, email);
    res.status(200).json({ message: 'OTP sent successfully', details: result });
  } catch (error) {
    res.status(500).json({
      message: 'Error sending OTP',
      error: (error as Error).message,
    });
  }
};

export const verifyOTP = async (req: Request, res: Response) => {
  const { otp, mobileNumber } = req.body;

  if (!otp || !mobileNumber) {
    return res.status(400).json({ message: 'OTP and mobileNumber are required' });
  }

  try {
    const result = await verifyOtp(otp, mobileNumber);
    if (result.type === "success") {
      // Generate JWT Token
      const token = jwt.sign({ mobileNumber }, JWT_SECRET, { expiresIn: '1h' });

      res.status(200).json({ 
        message: 'OTP verified successfully', 
        token 
      });
    } else {
      res.status(400).json({ message: 'OTP verification failed', details: result });
    }
  } catch (error) {
    res.status(500).json({
      message: 'Error verifying OTP',
      error: (error as Error).message,
    });
  }
};
