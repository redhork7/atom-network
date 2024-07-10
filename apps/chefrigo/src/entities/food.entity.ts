import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Home } from './home.entity';

@Entity()
export class Food {
  @PrimaryGeneratedColumn()
  uid: number;

  @Column('varchar', {
    length: 300,
    comment: '식재료명',
  })
  name: string;

  @Column('text', { comment: '태그목록' })
  tags: string[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deletedAt?: Date;

  @ManyToOne(() => User, (user) => user.foods)
  user: User;

  @ManyToOne(() => Home, (home) => home.foods, { nullable: true })
  home?: Home;
}
