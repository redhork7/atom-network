import { Test, TestingModule } from '@nestjs/testing';
import { SignUpService } from './sign-up.service';
import { DatabaseModule } from '@app/database';
import { MockDatabaseModule } from '@app/database/test-utils/mock-database.module';
import { AccountsModule } from '../../accounts/accounts.module';
import { AccountsService } from '../../accounts/accounts.service';

describe('SignUpService', () => {
  let service: SignUpService;
  let accountsService: AccountsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AccountsModule],
      providers: [SignUpService],
    })
      .overrideModule(DatabaseModule)
      .useModule(MockDatabaseModule)
      .compile();

    service = module.get<SignUpService>(SignUpService);
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

    jest.spyOn(accountsService, 'register').mockResolvedValue(1);
    expect(await service.withAccount(dto)).toBe(1);
  });
});
