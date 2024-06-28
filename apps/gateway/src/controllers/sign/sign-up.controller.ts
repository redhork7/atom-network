import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ClientProxyAtomNetwork } from '../../constants/atom-network';
import { AuthService } from '@app/auth';
import { Public } from '@app/auth/guards/jwt-auth.guard';
import { SignUpWithAccountDto } from './sign.dto';
import { CmdSignUpWithAccount } from 'apps/atom-network/src/sign/sign.cmd';
import { AuthResponse, Failure, Success, UidResult } from '@app/types';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { validateDto } from '../../utils/dto-validator';

@ApiTags('sign')
@Controller('sign-up')
export class SignUpController {
  constructor(
    @Inject(ClientProxyAtomNetwork)
    private readonly atomNetworkProxy: ClientProxy,
    private readonly authService: AuthService,
  ) {}

  @Public()
  @ApiBody({ type: SignUpWithAccountDto })
  @ApiResponse({ status: Success, description: '가입 성공' })
  @ApiResponse({
    status: Failure,
    description: '가입 실패 (사유는 알려주지 않음)',
  })
  @Post('with-account')
  async withAccount(@Body() dto: SignUpWithAccountDto): Promise<AuthResponse> {
    const { data: uid }: UidResult = await firstValueFrom(
      this.atomNetworkProxy.send(
        { cmd: CmdSignUpWithAccount },
        validateDto(SignUpWithAccountDto, dto),
      ),
    );
    const jwtToken = await this.authService.issueToken({ uid });

    return { code: Success, result: jwtToken };
  }
}
