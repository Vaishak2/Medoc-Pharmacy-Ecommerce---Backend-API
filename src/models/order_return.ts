import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, JoinColumn } from 'typeorm';
import { Order } from './orderModel';

@Entity('tbl_returns')
export class Return {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Order, (order) => order.returns)
  @JoinColumn({ name: 'order_id' })
  order!: Order;
  

  @Column({ type: 'timestamp', nullable:true })
  return_date!: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', nullable:true })  // Default value added
  return_request_date!: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable:true})
  return_amount!: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable:true})
  purchased_amount!: number;

  @Column({ type: 'text' })
  return_reason!: string;

  @Column({ type: 'text', nullable: true })
  comments?: string;
}
