import { NestFactory } from '@nestjs/core';
import { ChefrigoModule } from './chefrigo.module';

async function bootstrap() {
  const app = await NestFactory.create(ChefrigoModule);
  await app.listen(3000);
}
bootstrap();
