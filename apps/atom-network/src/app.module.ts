import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { resolve } from 'path';
import { validate as validateDatabaseEnv } from '@app/database/env.validate';
import { AccountsModule } from './accounts/accounts.module';
import { DevicesModule } from './devices/devices.module';
import { SignModule } from './sign/sign.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [
        resolve(__dirname, '../../../../../../.env.atom-network'),
        resolve(__dirname, '../../../../../../.env.gateway'),
      ],
      validate: (config) => {
        return validateDatabaseEnv(config);
      },
    }),
    DevicesModule,
    AccountsModule,
    SignModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
