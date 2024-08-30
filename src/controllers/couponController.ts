
// This file contains the controller logic for managing coupon operations such as fetching and creating coupons.
import { Request, Response } from 'express';
import couponService from '../services/couponService';

export const getCoupons = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId);
    const pageNumber = parseInt(req.params.pageNumber) || 1;
    const searchKeyWord = req.params.searchKeyWord || '';

    const { coupons, total, pageNumber: currentPage, pageSize } = await couponService.getAllCoupons(userId, pageNumber, searchKeyWord);

    res.json({
      message: 'Success',
      data: {
        coupons,
        total,
        currentPage,  
        pageSize
      }
    });
  } catch (error) {
    console.error('Error fetching coupons', error);
    res.status(500).json({
      message: 'Error fetching coupons',
      error: (error as Error).message
    });
  }
};

const createCoupon = async (req: Request, res: Response) => {
  try {
    const coupon = await couponService.createCoupon(req.body);
    res.status(201).json(coupon);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export default { getCoupons, createCoupon };
