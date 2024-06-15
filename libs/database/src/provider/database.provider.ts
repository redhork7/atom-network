import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { resolve } from 'path';
import { DataSource } from 'typeorm';
import SnakeNamingStrategy from 'typeorm-naming-strategy';

const DatabaseProvider: Provider = {
  provide: 'DatabaseProvider',
  inject: [ConfigService],
  useFactory: async (config: ConfigService) => {
    const dataSource = new DataSource({
      type: 'mysql',
      host: config.get<string>('DB_HOST'),
      port: +config.get<string>('DB_PORT'),
      username: config.get<string>('DB_USER'),
      password: config.get<string>('DB_PASS'),
      database: config.get<string>('DB_NAME'),
      entities: [resolve(__dirname, '../../../../**/*.entity.{ts,js}')],
      synchronize: false,
      logging: true,
      namingStrategy: new SnakeNamingStrategy(),
    });

    return dataSource.initialize();
  },
};

export default DatabaseProvider;
