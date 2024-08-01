import { Entity, PrimaryGeneratedColumn, Column, OneToMany  } from 'typeorm';
import { Product } from './product';

@Entity('tbl_top_brands')
export class Top_brands {
  @PrimaryGeneratedColumn({ type: 'integer' })
  id!: number;

  @Column({ type: 'varchar', length: 255, name: 'logo_url' })
  logo_url!: string;

  @Column({ type: 'varchar', length: 255, name: 'brand_name' })
  brand_name!: string;

  @OneToMany(() => Product, product => product.brand)
  products!: Product[];
}

export default Top_brands;