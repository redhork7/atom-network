import { Controller } from '@nestjs/common';
import { DevicesService } from './devices.service';
import { EmptyResult, UidResult } from '@app/types';
import { MessagePattern } from '@nestjs/microservices';
import {
  CmdDevicesRegister,
  CmdDevicesSetFree,
  CmdDevicesSetOwner,
} from './devices.cmd';
import {
  IDevicesSetFreeDto,
  IDevicesSetOwnerDto,
  IDevicesRegisterDto,
} from './devices.dto';

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

  @MessagePattern({ cmd: CmdDevicesSetOwner })
  async setOwner(dto: IDevicesSetOwnerDto): Promise<EmptyResult> {
    return {
      result: !!(await this.devicesService.setOwner(dto)),
    };
  }

  @MessagePattern({ cmd: CmdDevicesSetFree })
  async setFree(dto: IDevicesSetFreeDto): Promise<EmptyResult> {
    return {
      result: !!(await this.devicesService.setFree(dto)),
    };
  }
}
