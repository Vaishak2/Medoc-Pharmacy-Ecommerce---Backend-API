import {
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    Column
  } from 'typeorm';
  import { User } from './user';
  import { CustomerReview } from './customerReview';
  
  @Entity('tbl_customer_reviews_likes')
  export class CustomerReviewLike {
    @PrimaryGeneratedColumn()
    id!: number;
  
    @ManyToOne(() => User, user => user.customerReviewLikes)   
    user!: User;
  
    @ManyToOne(() => CustomerReview, review => review.customerReviewLikes)
    review!: CustomerReview;
  
    @Column()
    isLike!: boolean;
  }
  