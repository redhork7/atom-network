import { JwtAuthGuard } from '@app/auth/guards/jwt-auth.guard';
import { Controller, Get, Inject, Post, Req, UseGuards } from '@nestjs/common';
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
  Failure,
  Response,
  SimpleRegisterResponse,
  Success,
  UidResult,
} from '@app/types';
import { firstValueFrom } from 'rxjs';
import { validateDto } from 'apps/gateway/src/utils/dto-validator';
import {
  FamiliesAddDto,
  FamiliesGetHomeListDto,
  FamiliesRemoveDto,
  FamiliesUpdateDto,
} from './families.dto.ts';
import {
  CmdFamiliesAdd,
  CmdFamiliesGetHomeList,
  CmdFamiliesRemove,
  CmdFamiliesUpdate,
} from 'apps/chefrigo/src/families/families.cmd';

@ApiTags('families')
@Controller('families')
export class FamiliesController {
  constructor(
    @Inject(ClientProxyChefrigo)
    private readonly chefrigoProxy: ClientProxy,
  ) {}

  @ApiBearerAuth()
  @ApiBody({ type: FamiliesAddDto })
  @ApiResponse({ status: Success, description: '가족 추가 완료' })
  @ApiResponse({ status: Failure, description: '가족 추가 실패' })
  @UseGuards(JwtAuthGuard)
  @Post('add')
  async add(@Req() req): Promise<SimpleRegisterResponse> {
    const { uid: accountUid } = req.user;
    const dto = validateDto(FamiliesAddDto, req.body);
    const response: UidResult = await firstValueFrom(
      this.chefrigoProxy.send({ cmd: CmdFamiliesAdd }, { ...dto, accountUid }),
    );

    return {
      code: response.result ? Success : Failure,
      result: response.data,
    };
  }

  @ApiBearerAuth()
  @ApiBody({ type: FamiliesRemoveDto })
  @ApiResponse({ status: Success, description: '가족 삭제 완료' })
  @ApiResponse({ status: Failure, description: '가족 삭제 실패' })
  @UseGuards(JwtAuthGuard)
  @Post('remove')
  async remove(@Req() req): Promise<EmptyResponse> {
    const { uid: accountUid } = req.user;
    const dto = validateDto(FamiliesRemoveDto, req.body);

    return {
      code: (
        await firstValueFrom(
          this.chefrigoProxy.send(
            { cmd: CmdFamiliesRemove },
            { ...dto, accountUid },
          ),
        )
      ).result
        ? Success
        : Failure,
    };
  }

  @ApiBearerAuth()
  @ApiBody({ type: FamiliesUpdateDto })
  @ApiResponse({ status: Success, description: '가족 정보 수정 완료' })
  @ApiResponse({ status: Failure, description: '가족 정보 수정 실패' })
  @UseGuards(JwtAuthGuard)
  @Post('update')
  async update(@Req() req): Promise<EmptyResponse> {
    const { uid: accountUid } = req.user;
    const { familyName: name, ...dto } = validateDto(
      FamiliesUpdateDto,
      req.body,
    );

    return {
      code: (
        await firstValueFrom(
          this.chefrigoProxy.send(
            { cmd: CmdFamiliesUpdate },
            { ...dto, name, accountUid },
          ),
        )
      ).result
        ? Success
        : Failure,
    };
  }

  @ApiBearerAuth()
  @ApiQuery({ type: FamiliesGetHomeListDto })
  @ApiResponse({ status: Success, description: '전체 장소 목록 조회 성공' })
  @UseGuards(JwtAuthGuard)
  @Get('homes')
  async getHomeList(@Req() req): Promise<Response<unknown>> {
    const { uid: accountUid } = req.user;
    const { userUuid } = validateDto(FamiliesGetHomeListDto, req.query);
    return {
      code: Success,
      result: (
        await firstValueFrom(
          this.chefrigoProxy.send(
            { cmd: CmdFamiliesGetHomeList },
            { accountUid, uuid: userUuid },
          ),
        )
      ).data,
    };
  }
}
