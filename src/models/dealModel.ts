// src/models/dealModel.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Product } from './product';
import { User } from './user';


@Entity('tbl_deals')
export class Deal {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User, user => user.deals)
  @JoinColumn({ name: 'userId' })
  user!: User; // Add the relationship with the User entity

  @ManyToOne(() => Product, product => product.deals)
  @JoinColumn({ name: 'productId' })
  product!: Product;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt!: Date;
}

export default Deal;
