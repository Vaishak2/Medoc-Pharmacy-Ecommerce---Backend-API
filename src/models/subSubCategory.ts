import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { SubCategory } from './subcategory';
import { Product } from './product';

@Entity('tbl_sub_subcategories', { schema: 'public' })
export class SubSubCategory {
  map(arg0: (subSubCategory: any) => { id: any; name: any; image_url: any; subCategoryId: any; createdAt: any; updatedAt: any; }): any {
    throw new Error('Method not implemented.');
  }

  
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id!: number;

  @Column('character varying', { name: 'name', length: 255 ,nullable: true })
  name!: string;
  
  @Column({ type: 'varchar', length: 255 ,nullable: true })
    image_url?: string;
    
  @Column({ type: 'int'})
    subcategoryId?: number;

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



    @ManyToOne(() => SubCategory, subCategory => subCategory.subSubCategories)
  subCategory!: SubCategory;

  @OneToMany(() => Product, product => product.subCategory)
    products!: Product[];

}
