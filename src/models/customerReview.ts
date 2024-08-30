import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
    JoinColumn,
    OneToMany
} from 'typeorm';
import { User } from './user';
import { Product } from './product';
import { CustomerReviewLike } from './customerReviewLikes';

@Entity('tbl_customer_reviews')
export class CustomerReview {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => User, user => user.customerReviews)
    @JoinColumn({ name: 'user_id' })
    user!: User;

    @ManyToOne(() => Product, product => product.customerReviews)
    @JoinColumn({ name: 'product_id' })
    product!: Product;

    @Column({ type: 'float', nullable : true })
    rating!: number;

    @Column({ type: 'simple-array' })
    customer_img!: string[];

    @Column({ type: 'varchar', length: 255 })
    review_title!: string;

    @Column({ type: 'text' })
    review_description!: string;

    @Column({ type: 'boolean', default: null })
    is_like!: boolean;

    @Column({ type: 'boolean', default: null })
    is_dislike!: boolean;

    @Column({ type: 'int', default: 0 })
    like!: number;

    @Column({ type: 'int', default: 0 })
    dislike!: number;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    date!: Date;

    @OneToMany(() => CustomerReviewLike, reviewLike => reviewLike.review)
    customerReviewLikes!: CustomerReviewLike[];
}

export default CustomerReview;
