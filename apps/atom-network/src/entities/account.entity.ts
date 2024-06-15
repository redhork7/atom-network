import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Device } from './device.entity';
import { Sso } from './sso.entity';

@Entity()
export class Account {
  @PrimaryGeneratedColumn()
  uid: number;

  @Column('varchar', {
    nullable: true,
    unique: true,
    comment: '아이디',
    length: 60,
  })
  id?: string;

  @Column('varchar', {
    nullable: true,
    comment: '비밀번호',
    length: 128,
    select: false,
  })
  password?: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  expiredAt?: Date;

  @OneToMany(() => Device, (device) => device.account)
  devices: Device[];

  @OneToMany(() => Sso, (sso) => sso.account)
  ssos: Device[];
}
