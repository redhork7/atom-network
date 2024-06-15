import { Injectable } from '@nestjs/common';

@Injectable()
export class ChefrigoService {
  getHello(): string {
    return 'Hello World!';
  }
}
