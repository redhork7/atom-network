import { Test, TestingModule } from '@nestjs/testing';
import { SignInController } from './sign-in.controller';
import { SignInService } from './sign-in.service';
import { MockAuthModule } from '@app/auth/test-utils/mock-auth.module';
import { AccountsModule } from '../../accounts/accounts.module';
import { DatabaseModule } from '@app/database';
import { MockDatabaseModule } from '@app/database/test-utils/mock-database.module';
import { Success } from '@app/types';

describe('SignInController', () => {
  let controller: SignInController;
  let signInService: SignInService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [MockAuthModule, AccountsModule],
      providers: [SignInService],
      controllers: [SignInController],
    })
      .overrideModule(DatabaseModule)
      .useModule(MockDatabaseModule)
      .compile();

    controller = module.get<SignInController>(SignInController);
    signInService = module.get<SignInService>(SignInService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('with account', async () => {
    jest.spyOn(signInService, 'withAccount').mockResolvedValue({
      accessToken: 'token',
      refreshToken: 'token',
      magicToken: 'token',
    });
    expect(
      (
        await controller.withAccount({
          id: 'non-exists',
          password: 'non-exists',
        })
      ).code,
    ).toBe(Success);
  });
});
