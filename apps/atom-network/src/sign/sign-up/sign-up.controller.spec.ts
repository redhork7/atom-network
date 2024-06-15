import { Test, TestingModule } from '@nestjs/testing';
import { SignUpController } from './sign-up.controller';
import { SignUpService } from './sign-up.service';
import { MockAuthModule } from '@app/auth/test-utils/mock-auth.module';
import { DatabaseModule } from '@app/database';
import { MockDatabaseModule } from '@app/database/test-utils/mock-database.module';
import { Success } from '@app/types';
import { AccountsModule } from '../../accounts/accounts.module';

describe('SignUpController', () => {
  let controller: SignUpController;
  let signUpService: SignUpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [MockAuthModule, AccountsModule],
      providers: [SignUpService],
      controllers: [SignUpController],
    })
      .overrideModule(DatabaseModule)
      .useModule(MockDatabaseModule)
      .compile();

    controller = module.get<SignUpController>(SignUpController);
    signUpService = module.get<SignUpService>(SignUpService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('with account', async () => {
    jest.spyOn(signUpService, 'withAccount').mockResolvedValue({
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
