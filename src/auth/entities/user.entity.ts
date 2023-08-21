import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { nullable: false })
  fullName: string;

  @Column('text', { unique: true, nullable: false })
  email: string;

  @Column('text', { nullable: false })
  password: string;

  @Column('bool', { default: true })
  isActive: boolean;

  @Column('text', { array: true, default: ['user'] })
  roles: string[];

  @CreateDateColumn()
  @Index()
  createdAt: Date;

  @UpdateDateColumn()
  @Index()
  updatedAt: Date;

  //   @DeleteDateColumn()
  //   @Index()
  //   deletedAt: Date;
}
