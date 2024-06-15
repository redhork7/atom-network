import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AccountsService } from './accounts.service';
import { JwtAuthGuard } from '@app/auth/guards/jwt-auth.guard';
import { Failure, Success, EmptyResponse } from '@app/types';
import { AccountsChangePasswordDto } from './accounts.dto';

@ApiTags('accounts')
@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @ApiBearerAuth()
  @ApiBody({ type: AccountsChangePasswordDto })
  @ApiResponse({ status: Success, description: '비밀번호 변경 완료' })
  @ApiResponse({ status: Failure, description: '비밀번호 변경 실패' })
  @UseGuards(JwtAuthGuard)
  @Post('change/password')
  async changePassword(@Request() req): Promise<EmptyResponse> {
    const { uid } = req.user;
    const dto = req.body as AccountsChangePasswordDto;

    return {
      code: (await this.accountsService.changePassword(uid, dto))
        ? Success
        : Failure,
    };
  }

  @ApiBearerAuth()
  @ApiResponse({ status: Success, description: '계정 탈퇴 완료' })
  @ApiResponse({ status: Failure, description: '계정 탈퇴 실패' })
  @UseGuards(JwtAuthGuard)
  @Post('expire')
  async expire(@Request() req): Promise<EmptyResponse> {
    const { uid } = req.user;

    return {
      code: (await this.accountsService.expire(uid)) ? Success : Failure,
    };
  }
}
