import { Inject, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Device } from '../entities/device.entity';

@Injectable()
export class DevicesRepository extends Repository<Device> {
  constructor(
    @Inject('DatabaseProvider') private readonly dataSource: DataSource,
  ) {
    super(Device, dataSource.createEntityManager());
  }
}
