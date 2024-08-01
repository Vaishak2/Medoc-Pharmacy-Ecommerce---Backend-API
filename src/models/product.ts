// src/models/productModel.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { SubSubCategory } from './subSubCategory';
import { SubCategory } from './subcategory';
import { Category } from './category';
import { Top_brands } from './topBrands';
import { Deal } from './dealModel';
import { Carts } from './cart';
import { Wishlist } from './wishlistModel';
import { RecentlyViewed } from './recentlyViewed';
import { Order } from './orderModel';
// import CustomerReviews from './customerReview';


@Entity('tbl_products')
export class Product {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  name!: string;

  @Column({ nullable: true })
  description!: string;

  @Column('decimal', { nullable: true })
  price!: number;

  @Column({ nullable: true })
  stockQuantity!: number;

  @Column({ nullable: true })
  is_wishlist!: boolean;

  @Column({ nullable: true })
  image_url!: string;

  @Column({ nullable: true })
  isCart!: boolean;

  @Column({ nullable: true })
  isBestSeller!: boolean;

  @Column({ nullable: true })
  beforePrice!: string;

  @Column({ nullable: true })
  offer!: string;

  @Column({ nullable: true })
  size!: string;

  @Column({ nullable: true })
  quantity!: number;

  @Column({ nullable: true })
  productDetails!: string;

  @Column({ nullable: true })
  productFeatures!: string;

  @Column({ nullable: true })
  customerReviews!: string;

  @Column({ nullable: true })
  marketerDetails!: string;

  @Column({ nullable: true })
  manufacturerDetails!: string;

  @Column({ nullable: true })
  rating!: string;

  @Column({ nullable: true })
  brandName!: string;

  @Column({ nullable: true })
  assurance!: string;

  @Column({ nullable: true })
  retunPolicy!: string;

  @Column({ nullable: true })
  paymentPolicy!: string;

  @Column({ nullable: true })
  selectedSize!: string;

  @Column({ nullable: true })
  marketerName!: string;

  @Column({ nullable: true })
  marketerAddress!: string;

  @Column({ nullable: true })
  manufacturerName!: string;

  @Column({ nullable: true })
  manufacturerAddress!: string;

  @Column({ nullable: true })
  images!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @OneToMany(() => Order, (order) => order.product)
  orders!: Order[];

  @ManyToOne(() => Category, (category) => category.products)
  category: Category = new Category();

  @ManyToOne(() => SubCategory, (subCategory) => subCategory.products)
  subCategory: SubCategory = new SubCategory();

  @ManyToOne(() => SubSubCategory, (subSubCategory) => subSubCategory.products)
  subSubCategory: SubSubCategory = new SubSubCategory();

  @ManyToOne(() => Top_brands, (brand) => brand.products)
  brand: Top_brands = new Top_brands();

  @OneToMany(() => Carts, cart => cart.product)
  carts!: Carts[];

  @OneToMany(() => Wishlist, wishlist => wishlist.product)
  wishlist!: Wishlist[];

  @OneToMany(() => Deal, deal => deal.product)
  deals!: Deal[];

  @OneToMany(() => RecentlyViewed, recentlyViewed => recentlyViewed.product)
  recentlyViewed!: RecentlyViewed[];

  // @OneToMany(() => CustomerReviews, customerReviews => customerReviews.user)
  // customerReviews!: CustomerReviews[];
}

export default Product;
