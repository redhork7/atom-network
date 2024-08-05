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
  PageDto,
  Response,
  SimpleRegisterResponse,
  Success,
  UidResult,
} from '@app/types';
import { firstValueFrom } from 'rxjs';
import { validateDto } from 'apps/gateway/src/utils/dto-validator';
import {
  FoodsAddDto,
  FoodsGetListByFamilyDto,
  FoodsGetListByHomeDto,
  FoodsGetListWithoutHomeDto,
  FoodsRemoveDto,
  FoodsUpdateDto,
} from './foods.dto.ts';
import {
  CmdFoodsAdd,
  CmdFoodsGetListByFamily,
  CmdFoodsGetListByHome,
  CmdFoodsGetListWithoutHome,
  CmdFoodsRemove,
  CmdFoodsUpdate,
} from 'apps/chefrigo/src/foods/foods.cmd';

@ApiTags('foods')
@Controller('foods')
export class FoodsController {
  constructor(
    @Inject(ClientProxyChefrigo)
    private readonly chefrigoProxy: ClientProxy,
  ) {}

  @ApiBearerAuth()
  @ApiBody({ type: FoodsAddDto })
  @ApiResponse({ status: Success, description: '음식 생성 완료' })
  @ApiResponse({ status: Failure, description: '음식 생성 실패' })
  @Public()
  @Post('add')
  async add(@Body() dto: FoodsAddDto): Promise<SimpleRegisterResponse> {
    const response: UidResult = await firstValueFrom(
      this.chefrigoProxy.send(
        { cmd: CmdFoodsAdd },
        validateDto(FoodsAddDto, dto),
      ),
    );

    return {
      code: response.result ? Success : Failure,
      result: response.data,
    };
  }

  @ApiBearerAuth()
  @ApiBody({ type: FoodsRemoveDto })
  @ApiResponse({ status: Success, description: '음식 삭제 완료' })
  @ApiResponse({ status: Failure, description: '음식 삭제 실패' })
  @Public()
  @Post('remove')
  async remove(@Body() dto: FoodsRemoveDto): Promise<EmptyResponse> {
    const { foodUid, ...data } = validateDto(FoodsRemoveDto, dto);

    return {
      code: (
        await firstValueFrom(
          this.chefrigoProxy.send(
            { cmd: CmdFoodsRemove },
            { uid: foodUid, ...data },
          ),
        )
      ).result
        ? Success
        : Failure,
    };
  }

  @ApiBearerAuth()
  @ApiBody({ type: FoodsUpdateDto })
  @ApiResponse({ status: Success, description: '음식 변경 완료' })
  @ApiResponse({ status: Failure, description: '음식 변경 실패' })
  @Public()
  @Post('update')
  async update(@Body() dto: FoodsUpdateDto): Promise<EmptyResponse> {
    const { foodUid, ...data } = validateDto(FoodsUpdateDto, dto);

    return {
      code: (
        await firstValueFrom(
          this.chefrigoProxy.send(
            { cmd: CmdFoodsUpdate },
            { uid: foodUid, ...data },
          ),
        )
      ).result
        ? Success
        : Failure,
    };
  }

  @ApiBearerAuth()
  @ApiQuery({ type: FoodsGetListByFamilyDto })
  @ApiResponse({ status: Success, description: '가족 음식 목록 조회 성공' })
  @Public()
  @Get('list/family')
  async getListByFamily(@Query() query): Promise<Response<unknown>> {
    const dto = validateDto(FoodsGetListByFamilyDto, PageDto.filter(query));

    return {
      code: Success,
      result: (
        await firstValueFrom(
          this.chefrigoProxy.send({ cmd: CmdFoodsGetListByFamily }, dto),
        )
      ).data,
    };
  }

  @ApiBearerAuth()
  @ApiQuery({ type: FoodsGetListByHomeDto })
  @ApiResponse({ status: Success, description: '장소 음식 목록 조회 성공' })
  @Public()
  @Get('list/home')
  async getListByHome(@Query() query): Promise<Response<unknown>> {
    const dto = validateDto(FoodsGetListByHomeDto, PageDto.filter(query));

    return {
      code: Success,
      result: (
        await firstValueFrom(
          this.chefrigoProxy.send({ cmd: CmdFoodsGetListByHome }, dto),
        )
      ).data,
    };
  }

  @ApiBearerAuth()
  @ApiQuery({ type: FoodsGetListWithoutHomeDto })
  @ApiResponse({
    status: Success,
    description: '장소 미지정 음식 목록 조회 성공',
  })
  @Public()
  @Get('list/without-home')
  async getListWithoutHome(@Query() query): Promise<Response<unknown>> {
    const dto = validateDto(FoodsGetListWithoutHomeDto, PageDto.filter(query));

    return {
      code: Success,
      result: (
        await firstValueFrom(
          this.chefrigoProxy.send({ cmd: CmdFoodsGetListWithoutHome }, dto),
        )
      ).data,
    };
  }
}
