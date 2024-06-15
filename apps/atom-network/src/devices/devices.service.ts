import { Injectable } from '@nestjs/common';
import { DevicesRepository } from './devices.repository';
import { Device } from '../entities/device.entity';
import { DevicesRegisterDto } from './devices.dto';

@Injectable()
export class DevicesService {
  constructor(private readonly devicesRepository: DevicesRepository) {}

  async register(dto: DevicesRegisterDto): Promise<number | false> {
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
}
