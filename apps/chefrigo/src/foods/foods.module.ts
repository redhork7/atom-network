import { Module } from '@nestjs/common';
import { FoodsService } from './foods.service';
import { FoodsController } from './foods.controller';
import { FoodsRepository } from './foods.repository';
import { DatabaseModule } from '@app/database';

@Module({
  imports: [DatabaseModule],
  providers: [FoodsService, FoodsRepository],
  exports: [FoodsService],
  controllers: [FoodsController],
})
export class FoodsModule {}
