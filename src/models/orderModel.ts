import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, JoinColumn, OneToMany } from 'typeorm';
import { User } from './user';
import { Product } from './product';
import { Return } from './order_return';
import { Carts } from './cart';
import { Address } from './address';

@Entity('tbl_orders')
export class Order {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User, (user) => user.orders)
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @ManyToOne(() => Product, (product) => product.orders)
  @JoinColumn({ name: 'product_id' })
  product!: Product;

  @ManyToOne(() => Address, (address) => address.orders)
  @JoinColumn({ name: 'address_Id' })
  address!: Address;

  @Column({ type: 'varchar', length: 50 })
  status!: string;

  @Column({ type: 'varchar', nullable: true, length: 50 })
  payment_method!: string;

  @Column({ type: 'text', nullable: true })
  reason_for_cancel!: string;

  @Column({ type: 'text', nullable: true })
  comments!: string;

  @Column({ type: 'text', nullable: true })
  subTotal!: number;

  @Column({ type: 'text', nullable: true })
  totalSavings!: number;

  @Column({ type: 'text', nullable: true })
  couponDiscount!: number;

  @Column({ type: 'text', nullable: true })
  taxes!: number;

  @Column({ type: 'text', nullable: true })
  totalAmount!: number;

  @CreateDateColumn({ type: 'timestamp' })
  ordered_at!: Date;

  @Column({ type: 'timestamp', nullable: true })
  order_confirmed_date?: Date;

  @Column({ type: 'timestamp', nullable: true })
  item_shipped_date?: Date;

  @Column({ type: 'timestamp', nullable: true })
  out_for_delivery_date?: Date;

  @Column({ type: 'timestamp', nullable: true })
  item_is_delivered?: Date;

  @OneToMany(() => Return, (orderReturn) => orderReturn.order)
  returns!: Return[];

  @OneToMany(() => Carts, (cart) => cart.order)
  carts!: Carts[];

    
}


