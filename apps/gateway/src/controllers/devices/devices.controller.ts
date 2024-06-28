import {
  Body,
  Controller,
  Inject,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard, Public } from '@app/auth/guards/jwt-auth.guard';
import {
  EmptyResponse,
  EmptyResult,
  Failure,
  SimpleRegisterResponse,
  Success,
  UidResult,
} from '@app/types';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ClientProxyAtomNetwork } from '../../constants/atom-network';
import { DevicesRegisterDto, DevicesSetOwnerDto } from './devices.dto';
import {
  CmdDevicesRegister,
  CmdDevicesSetOwner,
} from 'apps/atom-network/src/devices/devices.cmd';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { validateDto } from '../../utils/dto-validator';

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
      this.atomNetworkProxy.send(
        { cmd: CmdDevicesRegister },
        validateDto(DevicesRegisterDto, dto),
      ),
    );

    return response.result
      ? { code: Success, result: { uid: response.data } }
      : { code: Failure };
  }

  @ApiBearerAuth()
  @ApiBody({ type: DevicesSetOwnerDto })
  @ApiResponse({ status: Success, description: '비밀번호 변경 완료' })
  @ApiResponse({ status: Failure, description: '비밀번호 변경 실패' })
  @UseGuards(JwtAuthGuard)
  @Post('set-owner')
  async changePassword(@Request() req): Promise<EmptyResponse> {
    const { uid: accountUid } = req.user;
    const dto = validateDto(DevicesSetOwnerDto, req.body);
    const response: EmptyResult = await firstValueFrom(
      this.atomNetworkProxy.send(
        { cmd: CmdDevicesSetOwner },
        { ...dto, accountUid },
      ),
    );

    return {
      code: response.result ? Success : Failure,
    };
  }
}
