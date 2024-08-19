import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { User } from './user';
import { Order } from './orderModel';

@Entity('tbl_address')
export class Address {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: 'userId', nullable: true })
  userId!: number;

  @Column({ type: 'varchar', nullable: true })
  addresstype!: string;

  @Column({ type: 'varchar', nullable: true })
  housename!: string;

  @Column({ type: 'varchar', nullable: true })
  town!: string;

  @Column({ type: 'varchar', nullable: true })
  country!: string;

  @Column({ type: 'varchar', nullable: true })
  emirate!: string;

  @Column({ type: 'varchar', nullable: true })
  landmark!: string;

  @Column({ type: 'varchar', nullable: true })
  streetName!: string;

  @Column({ type: 'varchar', nullable: true })
  name!: string;

  @Column({ type: 'varchar', nullable: true })
  phoneNumber!: string;

  @Column({ type: 'boolean', nullable: true })
  isselected!: boolean;

  @ManyToOne(() => User, (user) => user.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user!: User;

  @OneToMany(() => Order, (order) => order.user)
  orders!: Order[];
}
