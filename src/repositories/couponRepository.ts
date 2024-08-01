// src/repositories/couponRepository.ts
import { EntityRepository, Repository } from 'typeorm';
import { Coupon } from '../models/couponModel';

@EntityRepository(Coupon)
export class CouponRepository extends Repository<Coupon> {}

export default CouponRepository;
