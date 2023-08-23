import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Product } from './';
import { ApiProperty } from '@nestjs/swagger';
@Entity({ name: 'product_images' })
export class ProductImage {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: string;

  @ApiProperty()
  @Column('text', { nullable: false })
  @Index()
  url: string;

  @ApiProperty()
  @ManyToOne(() => Product, (produc) => produc.images, {
    // eager: true,
    onDelete: 'CASCADE',
  })
  product: Product;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;

  // @DeleteDateColumn()
  // @Index()
  // deletedAt: Date;

  // @BeforeInsert()
  // updateSlugInsert() {
  //   if (!this.slug) {
  //     this.slug = this.title;
  //   }
  //   this.slug = this.slug
  //     .toLowerCase()
  //     .replaceAll(' ', '_')
  //     .replaceAll("'", '');
  // }
  // @BeforeUpdate()
  // updateSlugUpdate() {
  //   this.slug = this.slug
  //     .toLowerCase()
  //     .replaceAll(' ', '_')
  //     .replaceAll("'", '');
  // }
}
