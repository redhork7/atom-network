import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Account } from './account.entity';

@Entity()
export class Device {
  @PrimaryGeneratedColumn()
  uid: number;

  @Column('varchar', {
    nullable: false,
    unique: true,
    comment: '고유번호',
    length: 260,
  })
  uuid: string;

  @Column('varchar', { nullable: true, comment: '기기정보', length: 120 })
  userAgent?: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @ManyToOne(() => Account, (account) => account.devices, { nullable: true })
  account?: Account | null;
}
