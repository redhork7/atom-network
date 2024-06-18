import { Test, TestingModule } from '@nestjs/testing';
import { SignInService } from './sign-in.service';
import { AccountsModule } from '../../accounts/accounts.module';
import { MockDatabaseModule } from '@app/database/test-utils/mock-database.module';
import { DatabaseModule } from '@app/database';
import { AccountsService } from '../../accounts/accounts.service';

describe('SignInService', () => {
  let service: SignInService;
  let accountsService: AccountsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AccountsModule],
      providers: [SignInService],
    })
      .overrideModule(DatabaseModule)
      .useModule(MockDatabaseModule)
      .compile();
    service = module.get<SignInService>(SignInService);
    accountsService = module.get<AccountsService>(AccountsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('with account', async () => {
    const dto = {
      id: 'testId1009',
      password: 'testpwd#1009',
    };

    jest.spyOn(accountsService, 'findUidBy').mockResolvedValue(1);
    expect(await service.withAccount(dto)).toBe(1);
  });
});
