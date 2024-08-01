import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, JoinColumn } from 'typeorm';
import { Order } from './orderModel';

@Entity('tbl_returns')
export class Return {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Order, (order) => order.returns)
  @JoinColumn({ name: 'order_id' })
  order!: Order;

  @Column({ type: 'timestamp' })
  return_date!: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  return_amount!: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  purchased_amount!: number;

  @Column({ type: 'text' })
  return_reason!: string;

  @Column({ type: 'text', nullable: true })
  comments?: string;
}
