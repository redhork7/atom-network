import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Food } from './food.entity';
import { Family } from './family.entity';

@Entity()
export class Home {
  @PrimaryGeneratedColumn()
  uid: number;

  @Column('varchar', {
    length: 40,
    nullable: true,
    comment: '장소명',
  })
  placeName?: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @OneToMany(() => Food, (food) => food.home)
  foods: Food[];

  @OneToMany(() => Family, (family) => family.home)
  families: Family[];
}
