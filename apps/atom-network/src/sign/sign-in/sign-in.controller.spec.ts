import { Test, TestingModule } from '@nestjs/testing';
import { SignInController } from './sign-in.controller';
import { SignInService } from './sign-in.service';
import { AccountsModule } from '../../accounts/accounts.module';
import { DatabaseModule } from '@app/database';
import { MockDatabaseModule } from '@app/database/test-utils/mock-database.module';

describe('SignInController', () => {
  let controller: SignInController;
  let signInService: SignInService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AccountsModule],
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
    jest.spyOn(signInService, 'withAccount').mockResolvedValue(1);
    expect(
      (
        await controller.withAccount({
          id: 'non-exists',
          password: 'non-exists',
        })
      ).data,
    ).toBe(1);
  });
});
