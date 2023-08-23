import {
  // DeleteDateColumn,
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProductImage } from './';
import { User } from '../../auth/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';
@Entity({ name: 'products' })
export class Product {
  @ApiProperty({
    example: 'daff1384-36c6-4642-bb45-cab93a648e87',
    description: 'Produc id',
    uniqueItems: true,
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'Shirt',
    description: 'Produc title',
    uniqueItems: true,
  })
  @Column('text', {
    unique: true,
    nullable: false,
  })
  @Index()
  title: string;

  @ApiProperty()
  @Column('float', { nullable: false, default: 0 })
  price?: number;

  @ApiProperty()
  @Column({ type: 'text', nullable: false })
  description: string;

  @ApiProperty()
  @Column({ type: 'text', nullable: false, unique: true })
  @Index()
  slug?: string;

  @ApiProperty()
  @Column('int', { nullable: false, default: 0 })
  stock: number;

  @ApiProperty()
  @Column('text', { array: true, nullable: false })
  sizes: string[];

  @ApiProperty()
  @Column('text', { nullable: false })
  gender: string;

  @ApiProperty()
  @Column('text', { array: true, nullable: false, default: [] })
  tags: string[];

  @ApiProperty()
  @OneToMany(() => ProductImage, (producImage) => producImage.product, {
    cascade: true,
    eager: true,
  })
  images?: ProductImage[];

  @ManyToOne(() => User, (user) => user.product, { eager: true })
  user: User;

  @ApiProperty()
  @CreateDateColumn()
  @Index()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  @Index()
  updatedAt: Date;

  // @DeleteDateColumn()
  // @Index()
  // deletedAt: Date;

  @BeforeInsert()
  updateSlugInsert() {
    if (!this.slug) {
      this.slug = this.title;
    }
    this.slug = this.slug
      .toLowerCase()
      .replaceAll(' ', '_')
      .replaceAll("'", '');
  }
  @BeforeUpdate()
  updateSlugUpdate() {
    this.slug = this.slug
      .toLowerCase()
      .replaceAll(' ', '_')
      .replaceAll("'", '');
  }
}
