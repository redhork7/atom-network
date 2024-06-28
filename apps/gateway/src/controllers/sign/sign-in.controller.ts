import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ClientProxyAtomNetwork } from '../../constants/atom-network';
import { AuthService } from '@app/auth';
import { Public } from '@app/auth/guards/jwt-auth.guard';
import { SignInWithAccountDto } from './sign.dto';
import { CmdSignInWithAccount } from 'apps/atom-network/src/sign/sign.cmd';
import { AuthResponse, Failure, Success, UidResult } from '@app/types';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { validateDto } from '../../utils/dto-validator';

@ApiTags('sign')
@Controller('sign-in')
export class SignInController {
  constructor(
    @Inject(ClientProxyAtomNetwork)
    private readonly atomNetworkProxy: ClientProxy,
    private readonly authService: AuthService,
  ) {}

  @Public()
  @ApiBody({ type: SignInWithAccountDto })
  @ApiResponse({ status: Success, description: '로그인 성공' })
  @ApiResponse({
    status: Failure,
    description: '로그인 실패 (사유는 알려주지 않음)',
  })
  @Post('with-account')
  async withAccount(@Body() dto: SignInWithAccountDto): Promise<AuthResponse> {
    const { data: uid }: UidResult = await firstValueFrom(
      this.atomNetworkProxy.send(
        { cmd: CmdSignInWithAccount },
        validateDto(SignInWithAccountDto, dto),
      ),
    );
    const jwtToken = await this.authService.issueToken({ uid });

    return { code: Success, result: jwtToken };
  }
}
