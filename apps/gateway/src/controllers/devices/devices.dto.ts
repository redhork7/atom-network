import { ApiProperty } from '@nestjs/swagger';
import {
  IDevicesRegisterDto,
  IDevicesSetOwnerDto,
} from 'apps/atom-network/src/devices/devices.dto';
import { Expose } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class DevicesRegisterDto implements IDevicesRegisterDto {
  @ApiProperty({ description: '기기 고유번호 (client 에서 생성)' })
  @Expose()
  @IsString()
  uuid: string;

  @ApiProperty({
    required: false,
    description: '기기 명칭 (aosapp, iosapp, pcweb, moweb 반드시 포함)',
  })
  @Expose()
  @IsString()
  @IsOptional()
  userAgent?: string;
}

export class DevicesSetOwnerDto
  implements Omit<IDevicesSetOwnerDto, 'accountUid'>
{
  @ApiProperty({ description: '기기 고유번호 (client 에서 생성)' })
  @Expose()
  @IsNumber()
  uid: number;
}
