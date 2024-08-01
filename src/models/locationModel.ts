import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('tbl_location')
export class Location {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'decimal', precision: 10, scale: 6 })
  latitude!: number;

  @Column({ type: 'decimal', precision: 10, scale: 6 })
  longitude!: number;

  @Column({ type: 'varchar', length: 255 })
  name!: string;

  @Column({ type: 'varchar', length: 255 })
  imageurl!: string;

  @Column({ type: 'text' })
  address!: string;

  @Column({ type: 'decimal', precision: 2, scale: 1 })
  rating!: number;

  @Column({ type: 'varchar', length: 255 })
  shop_open_at!: string;

  @Column({ type: 'varchar', length: 255 })
  shop_close_at!: string;
}

export default Location;
