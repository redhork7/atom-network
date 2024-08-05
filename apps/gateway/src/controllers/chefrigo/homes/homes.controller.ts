import { Public } from '@app/auth/guards/jwt-auth.guard';
import { Body, Controller, Get, Inject, Post, Query } from '@nestjs/common';
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
import {
  HomesGetHiddenListDto,
  HomesHideDto,
  HomesRegisterDto,
  HomesShowDto,
  HomesUpdateDto,
} from './homes.dto.ts';
import {
  CmdHomesGetHiddenList,
  CmdHomesHide,
  CmdHomesRegister,
  CmdHomesShow,
  CmdHomesUpdate,
} from 'apps/chefrigo/src/homes/homes.cmd';
import { validateDto } from 'apps/gateway/src/utils/dto-validator';

@ApiTags('homes')
@Controller('homes')
export class HomesController {
  constructor(
    @Inject(ClientProxyChefrigo)
    private readonly chefrigoProxy: ClientProxy,
  ) {}

  @ApiBearerAuth()
  @ApiBody({ type: HomesRegisterDto })
  @ApiResponse({ status: Success, description: '장소 생성 완료' })
  @ApiResponse({ status: Failure, description: '장소 생성 실패' })
  @Public()
  @Post('register')
  async register(
    @Body() dto: HomesRegisterDto,
  ): Promise<SimpleRegisterResponse> {
    const response: UidResult = await firstValueFrom(
      this.chefrigoProxy.send(
        { cmd: CmdHomesRegister },
        validateDto(HomesRegisterDto, dto),
      ),
    );

    return {
      code: response.result ? Success : Failure,
      result: response.data,
    };
  }

  @ApiBearerAuth()
  @ApiBody({ type: HomesUpdateDto })
  @ApiResponse({ status: Success, description: '장소 변경 완료' })
  @ApiResponse({ status: Failure, description: '장소 변경 실패' })
  @Public()
  @Post('update')
  async update(@Body() dto: HomesUpdateDto): Promise<EmptyResponse> {
    const { homeUid, ...data } = validateDto(HomesUpdateDto, dto);

    return {
      code: (
        await firstValueFrom(
          this.chefrigoProxy.send(
            { cmd: CmdHomesUpdate },
            { uid: homeUid, ...data },
          ),
        )
      ).result
        ? Success
        : Failure,
    };
  }

  @ApiBearerAuth()
  @ApiBody({ type: HomesHideDto })
  @ApiResponse({ status: Success, description: '장소 숨김 완료' })
  @ApiResponse({ status: Failure, description: '장소 숨김 실패' })
  @Public()
  @Post('hide')
  async hide(@Body() dto: HomesHideDto): Promise<EmptyResponse> {
    const { homeUid, ...data } = validateDto(HomesHideDto, dto);

    return {
      code: (
        await firstValueFrom(
          this.chefrigoProxy.send(
            { cmd: CmdHomesHide },
            { uid: homeUid, ...data },
          ),
        )
      ).result
        ? Success
        : Failure,
    };
  }

  @ApiBearerAuth()
  @ApiQuery({ type: HomesGetHiddenListDto })
  @ApiResponse({ status: Success, description: '숨긴 장소 목록 조회 성공' })
  @Public()
  @Get('hidden')
  async getHiddenList(@Query('uuid') uuid: string): Promise<Response<unknown>> {
    return {
      code: Success,
      result: (
        await firstValueFrom(
          this.chefrigoProxy.send({ cmd: CmdHomesGetHiddenList }, { uuid }),
        )
      ).data,
    };
  }

  @ApiBearerAuth()
  @ApiBody({ type: HomesShowDto })
  @ApiResponse({ status: Success, description: '장소 노출 완료' })
  @ApiResponse({ status: Failure, description: '장소 노출 실패' })
  @Public()
  @Post('show')
  async show(@Body() dto: HomesShowDto): Promise<EmptyResponse> {
    const { homeUid, ...data } = validateDto(HomesHideDto, dto);

    return {
      code: (
        await firstValueFrom(
          this.chefrigoProxy.send(
            { cmd: CmdHomesShow },
            { uid: homeUid, ...data },
          ),
        )
      ).result
        ? Success
        : Failure,
    };
  }
}
