import { Test, TestingModule } from '@nestjs/testing';
import { AuthService, JwtToken } from './auth.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { resolve } from 'path';

describe('AuthService', () => {
  let service: AuthService;
  let configService: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: resolve(__dirname, '../../../.env.test.auth'),
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
      providers: [AuthService],
    }).compile();

    service = module.get<AuthService>(AuthService);
    configService = module.get<ConfigService>(ConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should issue new jwt-token', async () => {
    const token = await service.issueToken({
      uid: +configService.get<string>('TEST_UID'),
    });
    expect(token.accessToken.length).toBeGreaterThan(100);
    expect(token.refreshToken.length).toBeGreaterThan(100);

    const isValid = await service.isValidToken(token);
    expect(isValid).toBeTruthy();
  });

  it('shoud validate remember token', async () => {
    const token: JwtToken = {
      accessToken: configService.get<string>('TEST_ACCESS_TOKEN'),
      refreshToken: configService.get<string>('TEST_REFRESH_TOKEN'),
      magicToken: configService.get<string>('TEST_MAGIC_TOKEN'),
    };

    const isValid = await service.isValidToken(token);
    expect(isValid).toBeFalsy();

    const isRemembered = await service.isRemembered(token);
    expect(isRemembered).toBeTruthy();
  });
});
