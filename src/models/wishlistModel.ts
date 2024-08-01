// src/models/wishlistModel.ts
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    CreateDateColumn,
  } from 'typeorm';
  import {User} from './user';
  import {Product} from './product';
  
  @Entity('tbl_wishlist')
  export  class Wishlist {
    @PrimaryGeneratedColumn()
    id!: number;
  
    @ManyToOne(() => User, (user) => user.id)
    // @JoinColumn({ name: 'userid' })
    user!: User;
  
    @ManyToOne(() => Product, (product) => product.id)
    // @JoinColumn({ name: 'productid' })
    product!: Product;  

    // @Column()
    // quantity!: number;
  }
  