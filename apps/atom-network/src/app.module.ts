import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { resolve } from 'path';
import { validate as validateDatabaseEnv } from '@app/database/env.validate';
import { validate as validateAuthEnv } from '@app/auth/env.validate';
import { AccountsModule } from './accounts/accounts.module';
import { DevicesModule } from './devices/devices.module';
import { SignModule } from './sign/sign.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: resolve(__dirname, '../../../../../../.env.atom-network'),
      validate: (config) => {
        return validateDatabaseEnv(config) && validateAuthEnv(config);
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
