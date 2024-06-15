import { Module } from '@nestjs/common';
import { DatabaseModule } from '@app/database';
import { DevicesRepository } from './devices.repository';
import { DevicesService } from './devices.service';
import { DevicesController } from './devices.controller';

@Module({
  imports: [DatabaseModule],
  providers: [DevicesRepository, DevicesService],
  controllers: [DevicesController],
})
export class DevicesModule {}
