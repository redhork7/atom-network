import { Controller, Get } from '@nestjs/common';
import { ChefrigoService } from './chefrigo.service';

@Controller('/')
export class ChefrigoController {
  constructor(private readonly chefrigoService: ChefrigoService) {}

  @Get('ping')
  ping(): string {
    return this.chefrigoService.ping();
  }
}
