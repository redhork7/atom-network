import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from '../auth.service';
import { JwtStrategy } from '../strategies/jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { resolve } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: resolve(__dirname, '../../../../.env.test.auth'),
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: `${configService.get<string>('JWT_EXPIRATION_MINUTE')}m`,
        },
      }),
    }),
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class MockAuthModule {}
