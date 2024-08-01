import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { SubCategory } from './subcategory';
import { Product } from './product';

@Entity('tbl_categories', { schema: 'public' })
export class Category {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id!: number;

  @Column('character varying', { name: 'name', length: 255 })
  name!: string;

  @Column('text', { name: 'description', nullable: true })
  description?: string;

  @Column({ type: 'varchar', length: 255 ,nullable: true })
  image_url?: string;

  @Column('timestamp without time zone', {
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt!: Date;

  @Column('timestamp without time zone', {
    name: 'updated_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt!: Date;

  @OneToMany(() => SubCategory, subCategory => subCategory.category)
  subCategories!: SubCategory[];

  @OneToMany(() => Product, product => product.subCategory)
  products!: Product[];
}
