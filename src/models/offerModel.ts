// src/models/offerModel.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,

} from 'typeorm';
import { User } from './user';

@Entity('tbl_offers')
export default class Offer {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  name!: string;

  @Column({ type: 'varchar' })
  image_url!: string;

  @Column({ type: 'varchar', })
  discount!: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  offerCode!: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  description!: string;


  @Column({ nullable: true })
  expirationDate!: Date;

  @Column({ nullable: true })
  isActive!: boolean;

  @ManyToOne(() => User, user => user.offers)
  user!: User;

}
