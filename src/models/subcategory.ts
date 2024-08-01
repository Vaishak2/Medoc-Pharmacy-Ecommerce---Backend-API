// src/models/SubcategoryModel.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Category } from './category';
import { Product } from './product';
import { SubSubCategory } from './subSubCategory';


@Entity('tbl_subcategories', { schema: 'public' })
export class SubCategory {

  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id!: number;

  @Column('character varying', { name: 'name', length: 255 })
  name!: string;

  @Column('timestamp without time zone', { 
      name: 'created_at',
      nullable: true,
      default: () => 'CURRENT_TIMESTAMP',
    })
    createdAt!: Date | null;
  
  @Column('timestamp without time zone', {
      name: 'updated_at',
      nullable: true,
      default: () => 'CURRENT_TIMESTAMP',
    })
    updatedAt!: Date | null;

  @Column({ type: 'int', nullable: true })
    categoryId?: number;

  @Column({ type: 'varchar', length: 255 ,nullable: true })
    image_url?: string;
  

  @ManyToOne(() => Category, category => category.subCategories)
    category: Category = new Category;

  @OneToMany(() => Product, product => product.subCategory)
    products!: Product[];

  // @OneToMany(() => SubSubCategory, (subSubCategory) => subSubCategory.subCategory)
  //   subSubCategories!: SubSubCategory[];

  @OneToMany(() => SubSubCategory, subSubCategory => subSubCategory.subCategory)
    subSubCategories!: SubSubCategory[];
}


export default SubCategory;
