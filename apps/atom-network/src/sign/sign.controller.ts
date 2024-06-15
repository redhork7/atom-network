import { AuthService, JwtTokenPayload } from '@app/auth';
import { AuthResponse, Failure, Success } from '@app/types';
import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SignRefreshTokenDto } from './sign.dto';
import { JwtAuthGuard } from '@app/auth/guards/jwt-auth.guard';
import { AccountsService } from '../accounts/accounts.service';

@ApiTags('sign')
@Controller('sign')
export class SignController {
  constructor(
    private readonly authService: AuthService,
    private readonly accountsService: AccountsService,
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

    if (
      (await this.authService.isRemembered(jwtToken)) &&
      (await this.accountsService.isLive(payload.uid))
    ) {
      return {
        code: Success,
        result: await this.authService.issueToken(payload),
      };
    }

    return { code: Failure };
  }
}
