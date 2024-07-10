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
export class User {
  @PrimaryGeneratedColumn()
  uid: number;

  @Column({
    length: 68,
    unique: true,
    comment: '클라이언트 내 저장된 사용자 식별값',
  })
  uuid: string;

  @Column({
    nullable: true,
    comment: '통합회원 고유번호',
  })
  accountUid?: number;

  @Column('varchar', {
    length: 60,
    nullable: true,
    comment: '닉네임',
  })
  nickName?: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @OneToMany(() => Food, (food) => food.user)
  foods: Food[];

  @OneToMany(() => Family, (family) => family.user)
  families: Family[];
}
