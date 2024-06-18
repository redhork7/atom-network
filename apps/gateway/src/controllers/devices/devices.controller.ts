import { Body, Controller, Inject, Post } from '@nestjs/common';
import { Public } from '@app/auth/guards/jwt-auth.guard';
import {
  Failure,
  SimpleRegisterResponse,
  Success,
  UidResult,
} from '@app/types';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ClientProxyAtomNetwork } from '../../constants/atom-network';
import { DevicesRegisterDto } from './devices.dto';
import { CmdDevicesRegister } from 'apps/atom-network/src/devices/devices.cmd';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@ApiTags('devices')
@Controller('devices')
export class DevicesController {
  constructor(
    @Inject(ClientProxyAtomNetwork)
    private readonly atomNetworkProxy: ClientProxy,
  ) {}

  @Public()
  @Post('register')
  @ApiResponse({ status: Success, description: '기기 등록 완료' })
  @ApiResponse({ status: Failure, description: '기기 등록 실패' })
  async register(
    @Body() dto: DevicesRegisterDto,
  ): Promise<SimpleRegisterResponse> {
    const response: UidResult = await firstValueFrom(
      this.atomNetworkProxy.send({ cmd: CmdDevicesRegister }, dto),
    );

    return response.result
      ? { code: Success, result: { uid: response.data } }
      : { code: Failure };
  }
}
