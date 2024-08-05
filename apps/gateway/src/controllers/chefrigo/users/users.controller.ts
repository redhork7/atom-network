import { JwtAuthGuard, Public } from '@app/auth/guards/jwt-auth.guard';
import {
  Controller,
  Get,
  Inject,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  ApiBearerAuth,
  ApiBody,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ClientProxyChefrigo } from '../../../constants/chefrigo';
import {
  EmptyResponse,
  EmptyResult,
  Failure,
  Response,
  Result,
  Success,
} from '@app/types';
import { firstValueFrom } from 'rxjs';
import {
  CmdUsersMe,
  CmdUsersRegister,
  CmdUsersUpdateProfile,
} from 'apps/chefrigo/src/users/users.cmd';
import { validateDto } from '../../../utils/dto-validator.js';
import {
  UsersMeDto,
  UsersRegisterDto,
  UsersUpdateProfileDto,
} from './users.dto.ts';
import { UsersMeResultDto } from 'apps/chefrigo/src/users/users.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(
    @Inject(ClientProxyChefrigo)
    private readonly chefrigoProxy: ClientProxy,
  ) {}

  @ApiBearerAuth()
  @ApiBody({ type: UsersRegisterDto })
  @ApiResponse({ status: Success, description: '사용자 생성 완료' })
  @ApiResponse({ status: Failure, description: '사용자 생성 실패' })
  @Public()
  @UseGuards(JwtAuthGuard)
  @Post('register')
  async register(@Request() req): Promise<Response<string>> {
    const account = req.user;
    const dto = validateDto(UsersRegisterDto, req.body);
    const response: Result<unknown> = await firstValueFrom(
      this.chefrigoProxy.send(
        { cmd: CmdUsersRegister },
        { ...dto, accountUid: account?.uid },
      ),
    );

    return {
      code: response.result ? Success : Failure,
      result: `${response.data}`,
    };
  }

  @ApiBearerAuth()
  @ApiQuery({ type: UsersMeDto })
  @ApiResponse({ status: Success, description: '사용자 정보 조회 성공' })
  @Public()
  @UseGuards(JwtAuthGuard)
  @Get('me')
  async me(@Query('uuid') uuid: string): Promise<Response<UsersMeResultDto>> {
    return {
      code: Success,
      result: (
        await firstValueFrom(
          this.chefrigoProxy.send({ cmd: CmdUsersMe }, { uuid }),
        )
      ).data,
    };
  }

  @ApiBearerAuth()
  @ApiBody({ type: UsersUpdateProfileDto })
  @ApiResponse({ status: Success, description: '프로필 변경 성공' })
  @ApiResponse({ status: Failure, description: '프로필 변경 실패' })
  @Public()
  @UseGuards(JwtAuthGuard)
  @Post('update/profile')
  async updateProfile(@Request() req): Promise<EmptyResponse> {
    const { uuid, ...dto } = validateDto(UsersUpdateProfileDto, req.body);
    const response: EmptyResult = await firstValueFrom(
      this.chefrigoProxy.send(
        { cmd: CmdUsersUpdateProfile },
        { uuid: uuid, ...dto },
      ),
    );

    return {
      code: response.result ? Success : Failure,
    };
  }
}
