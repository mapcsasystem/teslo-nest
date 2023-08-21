import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
@Entity({ name: 'upload_images' })
export class Cloudinary {
  @PrimaryGeneratedColumn()
  id: string;

  @Column('text', { nullable: false })
  @Index()
  url: string;
  @Column('text', { nullable: false })
  public_id: string;

  // @ManyToOne(() => Product, (produc) => produc.images, {
  //   // eager: true,
  //   onDelete: 'CASCADE',
  // })
  // product: Product;

  // @CreateDateColumn()
  // createdAt: Date;

  // @UpdateDateColumn()
  // updatedAt: Date;
}
