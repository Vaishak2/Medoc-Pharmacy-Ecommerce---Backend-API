// src/models/user.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Carts }  from './cart';
import { Wishlist } from './wishlistModel';
import { RecentlyViewed } from './recentlyViewed';
import { Order } from './orderModel';
import { Deal } from './dealModel'; // Import the Deal entity
import Notification from './notificationModel';
import CustomerReviews from './customerReview';
import Offer from './offerModel';
import { CustomerReviewLike } from './customerReviewLikes';

@Entity('tbl_users')
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 255 })
  username!: string;

  @Column({ type: 'varchar', length: 255 })
  password!: string;

  @Column({ type: 'varchar', length: 255 })
  email!: string;

  @Column({ type: 'varchar', nullable: true, length: 255 })
  gender!: string;

  @Column({ type: 'varchar', length: 10, default: 'active' })
  userStatus!: string;

  @Column({ type: 'text', nullable: true })
  reason_for_delete!: string;

  @Column({ type: 'text', nullable: true })
  comments!: string;

  @Column({ type: 'varchar', length: 255, unique: true, nullable: true })
  phoneNumber!: string;

  @OneToMany(() => Order, (order) => order.user)
  orders!: Order[];

  @Column({ type: 'varchar', length: 50, nullable: true })
  user_type!: string;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @OneToMany(() => Carts, cart => cart.user)
  carts!: Carts[];

  @OneToMany(() => Wishlist, wishlist => wishlist.user)
  wishlist!: Wishlist[];

  @OneToMany(() => RecentlyViewed, recentlyViewed => recentlyViewed.user)
  recentlyViewed!: RecentlyViewed[];

  @OneToMany(() => Deal, deal => deal.user)
  deals!: Deal[]; // Add the relationship with the Deal entity
  
  @OneToMany(() => Notification, notification => notification.user)
  notifications!: Notification[];

  @OneToMany(() => CustomerReviews, customerReviews => customerReviews.user)
  customerReviews!: CustomerReviews[];

  @OneToMany(() => Offer, offer => offer.user)
  offers!: Offer[];

  @OneToMany(() => CustomerReviewLike, reviewLike => reviewLike.user)
  customerReviewLikes!: CustomerReviewLike[];
}
