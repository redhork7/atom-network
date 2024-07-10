import { NestFactory } from '@nestjs/core';
import { ChefrigoModule } from './chefrigo.module';
import { ConfigService } from '@nestjs/config';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(ChefrigoModule);
  const appConfig = app.get<ConfigService>(ConfigService);
  const appPort = appConfig.get<number>('APP_PORT_CHEFRIGO');
  const msa = await NestFactory.createMicroservice<MicroserviceOptions>(
    ChefrigoModule,
    {
      transport: Transport.TCP,
      options: {
        host: '0.0.0.0',
        port: appPort,
      },
    },
  );

  await msa.listen();
  await app.listen(+appPort + 1);
}
bootstrap();
