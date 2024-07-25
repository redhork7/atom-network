import {
  Column,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Home } from './home.entity';
import { User } from './user.entity';

@Entity()
@Index('family_home_user_unique', ['user.uid', 'home.uid'], { unique: true })
export class Family {
  @PrimaryGeneratedColumn()
  uid: number;

  @Column('varchar', {
    length: 40,
    nullable: true,
    comment: '가족명',
  })
  name?: string;

  @ManyToOne(() => User, (user) => user.families, { eager: true })
  user: User;

  @ManyToOne(() => Home, (home) => home.families, { eager: true })
  home: Home;
}
