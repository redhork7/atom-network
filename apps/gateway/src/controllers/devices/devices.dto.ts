import { ApiProperty } from '@nestjs/swagger';
import { IDevicesRegisterDto } from 'apps/atom-network/src/devices/devices.dto';

export class DevicesRegisterDto implements IDevicesRegisterDto {
  @ApiProperty({ description: '기기 고유번호 (client 에서 생성)' })
  uuid: string;

  @ApiProperty({
    required: false,
    description: '기기 명칭 (aosapp, iosapp, pcweb, moweb 반드시 포함)',
  })
  userAgent?: string;
}
