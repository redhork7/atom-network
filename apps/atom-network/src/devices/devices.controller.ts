import { Controller } from '@nestjs/common';
import { DevicesService } from './devices.service';
import { UidResult } from '@app/types';
import { IDevicesRegisterDto } from './devices.dto';
import { MessagePattern } from '@nestjs/microservices';
import { CmdDevicesRegister } from './devices.cmd';

@Controller()
export class DevicesController {
  constructor(private readonly devicesService: DevicesService) {}

  @MessagePattern({ cmd: CmdDevicesRegister })
  async register(dto: IDevicesRegisterDto): Promise<UidResult> {
    const uid = await this.devicesService.register(dto);

    return {
      result: !!uid,
      ...(uid ? { data: uid } : {}),
    };
  }
}
