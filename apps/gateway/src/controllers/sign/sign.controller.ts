import { Controller, Inject, Post, Request, UseGuards } from '@nestjs/common';
import { ClientProxyAtomNetwork } from '../../constants/atom-network';
import { AuthService, JwtTokenPayload } from '@app/auth';
import {
  AuthResponse,
  EmptyResponse,
  EmptyResult,
  Failure,
  Success,
} from '@app/types';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SignOutDto, SignRefreshTokenDto } from './sign.dto';
import { JwtAuthGuard } from '@app/auth/guards/jwt-auth.guard';
import { CmdSignVerify } from 'apps/atom-network/src/sign/sign.cmd';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { CmdDevicesSetFree } from 'apps/atom-network/src/devices/devices.cmd';
import { IDevicesSetFreeDto } from 'apps/atom-network/src/devices/devices.dto';

@ApiTags('sign')
@Controller('sign')
export class SignController {
  constructor(
    @Inject(ClientProxyAtomNetwork)
    private readonly atomNetworkProxy: ClientProxy,
    private readonly authService: AuthService,
  ) {}

  @ApiBearerAuth()
  @ApiBody({ type: SignRefreshTokenDto })
  @ApiResponse({ status: Success, description: '재발급 성공' })
  @ApiResponse({
    status: Failure,
    description: '재발급 실패 (사유는 알려주지 않음)',
  })
  @UseGuards(JwtAuthGuard)
  @Post('refresh-token')
  async refreshToken(@Request() req): Promise<AuthResponse> {
    const payload = req.user as JwtTokenPayload;
    const jwtToken = req.body as SignRefreshTokenDto;
    const response: EmptyResult = await firstValueFrom(
      this.atomNetworkProxy.send({ cmd: CmdSignVerify }, payload.uid),
    );

    if ((await this.authService.isRemembered(jwtToken)) && response.result) {
      return {
        code: Success,
        result: await this.authService.issueToken(payload),
      };
    }

    return { code: Failure };
  }

  @ApiBearerAuth()
  @ApiBody({ type: SignOutDto })
  @ApiResponse({ status: Success, description: '로그아웃' })
  @ApiResponse({ status: Failure, description: '재시도 필요' })
  @UseGuards(JwtAuthGuard)
  @Post('out')
  async changePassword(@Request() req): Promise<EmptyResponse> {
    const dto: SignOutDto = req.body;

    // device 해제
    const response: EmptyResult = await firstValueFrom(
      this.atomNetworkProxy.send({ cmd: CmdDevicesSetFree }, {
        uid: dto.deviceUid,
      } as IDevicesSetFreeDto),
    );

    return {
      code: response.result ? Success : Failure,
    };
  }
}
