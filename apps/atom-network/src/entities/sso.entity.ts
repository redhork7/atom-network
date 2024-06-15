import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Account } from './account.entity';

export enum SsoChannel {
  APPLE = 1,
  GOOGLE = 2,
  FACEBOOK = 3,
  TWITTER = 4,
  NAVER = 5,
  KAKAO = 6,
}

@Entity()
export class Sso {
  @PrimaryGeneratedColumn()
  uid: number;

  @Column('varchar', { comment: '인증정보', length: 512 })
  credential: string;

  @Column({ type: 'enum', comment: '인증채널', enum: SsoChannel })
  channel: SsoChannel;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  expiredAt?: Date;

  @ManyToOne(() => Account, (account) => account.ssos)
  account: Account;
}
