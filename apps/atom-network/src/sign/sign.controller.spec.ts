import { Test, TestingModule } from '@nestjs/testing';
import { SignController } from './sign.controller';
import { MockAuthModule } from '@app/auth/test-utils/mock-auth.module';
import { AuthService } from '@app/auth';
import { Failure, Success } from '@app/types';
import { AccountsModule } from '../accounts/accounts.module';
import { DatabaseModule } from '@app/database';
import { MockDatabaseModule } from '@app/database/test-utils/mock-database.module';
import { AccountsService } from '../accounts/accounts.service';

describe('SignController', () => {
  let controller: SignController;
  let authService: AuthService;
  let accountsService: AccountsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [MockAuthModule, AccountsModule],
      controllers: [SignController],
    })
      .overrideModule(DatabaseModule)
      .useModule(MockDatabaseModule)
      .compile();

    controller = module.get<SignController>(SignController);
    authService = module.get<AuthService>(AuthService);
    accountsService = module.get<AccountsService>(AccountsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('refresh token', async () => {
    const payload = { uid: 1 };
    const token = await authService.issueToken(payload);

    jest.spyOn(accountsService, 'isLive').mockResolvedValue(true);
    expect(
      (await controller.refreshToken({ user: payload, body: token })).code,
    ).toBe(Success);

    jest.spyOn(accountsService, 'isLive').mockResolvedValue(false);
    expect(
      (await controller.refreshToken({ user: payload, body: token })).code,
    ).toBe(Failure);
  });
});
