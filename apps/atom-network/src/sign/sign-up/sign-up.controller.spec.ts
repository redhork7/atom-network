import { Test, TestingModule } from '@nestjs/testing';
import { SignUpController } from './sign-up.controller';
import { SignUpService } from './sign-up.service';
import { DatabaseModule } from '@app/database';
import { MockDatabaseModule } from '@app/database/test-utils/mock-database.module';
import { AccountsModule } from '../../accounts/accounts.module';

describe('SignUpController', () => {
  let controller: SignUpController;
  let signUpService: SignUpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AccountsModule],
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
    jest.spyOn(signUpService, 'withAccount').mockResolvedValue(1);
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
