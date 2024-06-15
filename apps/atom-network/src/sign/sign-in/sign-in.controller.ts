import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SignInService } from './sign-in.service';
import { Public } from '@app/auth/guards/jwt-auth.guard';
import { AuthResponse, Failure, Success } from '@app/types';
import { SignInWithAccountDto } from '../sign.dto';

@ApiTags('sign')
@Controller('sign-in')
export class SignInController {
  constructor(private readonly signInService: SignInService) {}

  @Public()
  @ApiBody({ type: SignInWithAccountDto })
  @ApiResponse({ status: Success, description: '로그인 성공' })
  @ApiResponse({
    status: Failure,
    description: '로그인 실패 (사유는 알려주지 않음)',
  })
  @Post('with-account')
  async withAccount(@Body() dto: SignInWithAccountDto): Promise<AuthResponse> {
    const token = await this.signInService.withAccount(dto);

    return { code: Success, result: token };
  }
}
