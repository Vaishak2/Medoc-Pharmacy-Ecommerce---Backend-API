// src/models/couponModel.ts
import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne } from 'typeorm';
import { User } from './user';

@Entity('tbl_coupons')
export class Coupon {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 255 })
  coupon_code!: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  save_amount!: number;

  @Column({ type: 'text', nullable: true })
  coupon_description?: string;

  @Column({ type: 'boolean', default: false })
  is_applied!: boolean;

  @Column()
    userId!: number; // Ensure this field exists if there's no direct relationship

    @ManyToOne(() => User)
    @JoinColumn({ name: 'userId' })
    user!: User;
}

export default Coupon;
