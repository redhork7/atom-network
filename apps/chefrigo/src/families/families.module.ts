import { Module } from '@nestjs/common';
import { FamiliesController } from './families.controller';
import { FamiliesService } from './families.service';
import { DatabaseModule } from '@app/database';
import { FamiliesRepository } from './families.repository';

@Module({
  imports: [DatabaseModule],
  providers: [FamiliesService, FamiliesRepository],
  controllers: [FamiliesController],
  exports: [FamiliesService],
})
export class FamiliesModule {}
