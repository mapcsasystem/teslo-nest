import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  // DeleteDateColumn,
  Index,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', {
    unique: true,
    nullable: false,
  })
  @Index()
  title: string;

  @Column('float', { nullable: false, default: 0 })
  price?: number;

  @Column({ type: 'text', nullable: false })
  description: string;

  @Column({ type: 'text', nullable: false, unique: true })
  @Index()
  slug?: string;

  @Column('int', { nullable: false, default: 0 })
  stock: number;

  @Column('text', { array: true, nullable: false })
  sizes: string[];

  @Column('text', { nullable: false })
  gender: string;

  @Column('text', { array: true, nullable: false, default: [] })
  tags: string[];

  // TODO:  create tags, images

  @CreateDateColumn()
  @Index()
  createdAt: Date;

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
