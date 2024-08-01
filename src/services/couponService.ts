// src/services/couponService.ts
import { getRepository } from 'typeorm';
import { Coupon } from '../models/couponModel';


//  * Fetches all coupons from the database.
//  * A promise that resolves to an array of coupons.

export const getAllCoupons = async (userId: number, pageNumber: number, searchKeyWord?: string): Promise<{ coupons: Coupon[], total: number, pageNumber: number, pageSize: number }> => {
  const couponRepository = getRepository(Coupon);
  const pageSize = 10; // Set the number of items per page
  const skip = (pageNumber - 1) * pageSize;

  const query = couponRepository.createQueryBuilder('coupon')
    .where('coupon.userId = :userId', { userId });

  if (searchKeyWord) {
    query.andWhere('LOWER(coupon.coupon_code) LIKE LOWER(:searchKeyWord)', { searchKeyWord: `%${searchKeyWord}%` });
  }

  const [coupons, total] = await query
    .skip(skip)
    .take(pageSize)
    .getManyAndCount();

  return {
    coupons,
    total,
    pageNumber,
    pageSize
  };
};
const createCoupon = async (couponData: Partial<Coupon>): Promise<Coupon> => {
  const couponRepository = getRepository(Coupon);
  const coupon = couponRepository.create(couponData);
  return await couponRepository.save(coupon);
};

export default { getAllCoupons, createCoupon };
