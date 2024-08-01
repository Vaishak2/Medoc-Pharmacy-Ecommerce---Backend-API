import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './user';
import { Product } from './product';

@Entity('tbl_recently_viewed')
export class RecentlyViewed {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User, user => user.recentlyViewed)
  user!: User;

  @ManyToOne(() => Product, product => product.recentlyViewed)
  product!: Product;

  @Column()
  createdAt!: Date;
}
