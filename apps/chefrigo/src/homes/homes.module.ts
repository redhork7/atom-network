import { Module } from '@nestjs/common';
import { DatabaseModule } from '@app/database';
import { HomesService } from './homes.service';
import { HomesRepository } from './homes.repository';
import { HomesController } from './homes.controller';

@Module({
  imports: [DatabaseModule],
  providers: [HomesService, HomesRepository],
  exports: [HomesService],
  controllers: [HomesController],
})
export class HomesModule {}
