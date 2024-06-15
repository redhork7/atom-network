import { Module } from '@nestjs/common';
import { ChefrigoController } from './chefrigo.controller';
import { ChefrigoService } from './chefrigo.service';

@Module({
  imports: [],
  controllers: [ChefrigoController],
  providers: [ChefrigoService],
})
export class ChefrigoModule {}
