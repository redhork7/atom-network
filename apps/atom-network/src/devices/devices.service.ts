import { Injectable } from '@nestjs/common';
import { DevicesRepository } from './devices.repository';
import { Device } from '../entities/device.entity';
import {
  IDevicesSetFreeDto,
  IDevicesSetOwnerDto,
  IDevicesRegisterDto,
} from './devices.dto';

@Injectable()
export class DevicesService {
  constructor(private readonly devicesRepository: DevicesRepository) {}

  async register(dto: IDevicesRegisterDto): Promise<number | false> {
    const { uuid, userAgent } = dto;
    const device =
      (await this.devicesRepository.findOneBy({ uuid })) || new Device();
    const { uid } = await this.devicesRepository.save({
      ...device,
      uuid,
      userAgent,
    });

    return uid;
  }

  async setOwner(dto: IDevicesSetOwnerDto): Promise<boolean> {
    const result = await this.devicesRepository
      .createQueryBuilder()
      .update<Device>(Device, { account: { uid: dto.accountUid } })
      .where('uid = :uid', { uid: dto.uid })
      .execute();

    return result.affected > 0;
  }

  async setFree(dto: IDevicesSetFreeDto): Promise<boolean> {
    const result = await this.devicesRepository
      .createQueryBuilder()
      .update<Device>(Device, { account: { uid: null } })
      .where('uid = :uid', { uid: dto.uid })
      .execute();

    return result.affected > 0;
  }
}
