import { ConfigService } from '@nestjs/config';
import { resolve } from 'path';
import { DataSource } from 'typeorm';
import SnakeNamingStrategy from 'typeorm-naming-strategy';

const configService = new ConfigService();

export default new DataSource({
  type: 'mysql',
  host: configService.get<string>('DB_HOST'),
  port: +configService.get<string>('DB_PORT'),
  username: configService.get<string>('DB_USER'),
  password: configService.get<string>('DB_PASS'),
  database: configService.get<string>('DB_NAME'),
  migrations: [
    resolve(
      __dirname,
      `../../../apps/${configService.get<string>('APP_NAME')}/src/migrations/*.ts`,
    ),
  ],
  entities: [
    resolve(
      __dirname,
      `../../../apps/${configService.get<string>('APP_NAME')}/src/entities/*.ts`,
    ),
  ],
  namingStrategy: new SnakeNamingStrategy(),
});
