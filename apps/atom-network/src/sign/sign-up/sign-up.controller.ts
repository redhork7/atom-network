import { Public } from '@app/auth/guards/jwt-auth.guard';
import { Success, Failure, AuthResponse } from '@app/types';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags, ApiBody, ApiResponse } from '@nestjs/swagger';
import { SignUpWithAccountDto } from '../sign.dto';
import { SignUpService } from './sign-up.service';

@ApiTags('sign')
@Controller('sign-up')
export class SignUpController {
  constructor(private readonly signUpService: SignUpService) {}

  @Public()
  @ApiBody({ type: SignUpWithAccountDto })
  @ApiResponse({ status: Success, description: '가입 성공' })
  @ApiResponse({
    status: Failure,
    description: '가입 실패 (사유는 알려주지 않음)',
  })
  @Post('with-account')
  async withAccount(@Body() dto: SignUpWithAccountDto): Promise<AuthResponse> {
    const token = await this.signUpService.withAccount(dto);

    return { code: Success, result: token };
  }
}
