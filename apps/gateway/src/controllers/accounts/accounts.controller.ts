import { Controller, Inject, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@app/auth/guards/jwt-auth.guard';
import { Failure, Success, EmptyResponse, EmptyResult } from '@app/types';
import { ClientProxyAtomNetwork } from '../../constants/atom-network';
import { AccountsChangePasswordDto } from './accounts.dto';
import {
  CmdAccountsChangePassword,
  CmdAccountsExpire,
} from 'apps/atom-network/src/accounts/accounts.cmd';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@ApiTags('accounts')
@Controller('accounts')
export class AccountsController {
  constructor(
    @Inject(ClientProxyAtomNetwork)
    private readonly atomNetworkProxy: ClientProxy,
  ) {}

  @ApiBearerAuth()
  @ApiBody({ type: AccountsChangePasswordDto })
  @ApiResponse({ status: Success, description: '비밀번호 변경 완료' })
  @ApiResponse({ status: Failure, description: '비밀번호 변경 실패' })
  @UseGuards(JwtAuthGuard)
  @Post('change/password')
  async changePassword(@Request() req): Promise<EmptyResponse> {
    const { uid } = req.user;
    const dto = req.body as AccountsChangePasswordDto;
    const response: EmptyResult = await firstValueFrom(
      this.atomNetworkProxy.send(
        { cmd: CmdAccountsChangePassword },
        { uid, ...dto },
      ),
    );

    return {
      code: response.result ? Success : Failure,
    };
  }

  @ApiBearerAuth()
  @ApiResponse({ status: Success, description: '계정 탈퇴 완료' })
  @ApiResponse({ status: Failure, description: '계정 탈퇴 실패' })
  @UseGuards(JwtAuthGuard)
  @Post('expire')
  async expire(@Request() req): Promise<EmptyResponse> {
    const { uid } = req.user;
    const response: EmptyResult = await this.atomNetworkProxy
      .send({ cmd: CmdAccountsExpire }, uid)
      .toPromise();

    return {
      code: response.result ? Success : Failure,
    };
  }
}
