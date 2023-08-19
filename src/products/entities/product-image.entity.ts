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
@Entity()
export class ProductImage {
  @PrimaryGeneratedColumn()
  id: string;

  @Column('text', { nullable: false })
  @Index()
  url: string;

  @ManyToOne(() => Product, (produc) => produc.images)
  product: Product;

  @CreateDateColumn()
  createdAt: Date;

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
