// src/models/wishlistModel.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user';
import { Product } from './product';
import { Order } from './orderModel';

@Entity('tbl_carts')
export class Carts {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'userId' })
  user!: User;

  @ManyToOne(() => Product, (product) => product.id)
  @JoinColumn({ name: 'productId' })
  product!: Product;

  @ManyToOne(() => Order, (order) => order.carts)
  @JoinColumn({ name: 'order_id' })
  order!: Order;

  @Column({ default: 1 })
  quantity!: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  size!: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt!: Date;

}

