import { Body, Controller, Post } from '@nestjs/common';
import { Public } from '@app/auth/guards/jwt-auth.guard';
import { DevicesService } from './devices.service';
import { Failure, SimpleRegisterResponse, Success } from '@app/types';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { DevicesRegisterDto } from './devices.dto';

@ApiTags('devices')
@Controller('devices')
export class DevicesController {
  constructor(private readonly devicesService: DevicesService) {}

  @Public()
  @Post('register')
  @ApiResponse({ status: Success, description: '기기 등록 완료' })
  @ApiResponse({ status: Failure, description: '기기 등록 실패' })
  async register(
    @Body() dto: DevicesRegisterDto,
  ): Promise<SimpleRegisterResponse> {
    const uid = await this.devicesService.register(dto);

    return uid ? { code: Success, result: { uid } } : { code: Failure };
  }
}
