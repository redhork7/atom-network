import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { resolve } from 'path';
import { validate as validateAuthEnv } from '@app/auth/env.validate';
import AtomNetworkProvider from './proxy-providers/atom-network';
import { AuthModule } from '@app/auth';
import { AccountsController } from './controllers/accounts/accounts.controller';
import { DevicesController } from './controllers/devices/devices.controller';
import { SignInController } from './controllers/sign/sign-in.controller';
import { SignUpController } from './controllers/sign/sign-up.controller';
import { SignController } from './controllers/sign/sign.controller';
import { ChefrigoModule } from './controllers/chefrigo/chefrigo.module';
import { RouterModule } from '@nestjs/core';
import ChefrigoProvider from './proxy-providers/chefrigo';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [resolve(__dirname, '../../../../../../.env.gateway')],
      validate: (config) => {
        return validateAuthEnv(config);
      },
    }),
    AuthModule,
    ChefrigoModule,
    RouterModule.register([{ path: 'chefrigo', module: ChefrigoModule }]),
  ],
  providers: [AtomNetworkProvider, ChefrigoProvider],
  controllers: [
    AccountsController,
    DevicesController,
    SignInController,
    SignUpController,
    SignController,
  ],
})
export class GatewayModule {}
