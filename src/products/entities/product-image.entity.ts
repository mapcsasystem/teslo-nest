import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  // BeforeInsert,
  // BeforeUpdate,
} from 'typeorm';
@Entity()
export class ProductImage {
  @PrimaryGeneratedColumn()
  id: string;

  @Column('text', { nullable: false })
  @Index()
  url: string;

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
