import { Test, TestingModule } from '@nestjs/testing';
import { SignController } from './sign.controller';
import { AccountsModule } from '../accounts/accounts.module';
import { DatabaseModule } from '@app/database';
import { MockDatabaseModule } from '@app/database/test-utils/mock-database.module';
import { AccountsService } from '../accounts/accounts.service';

describe('SignController', () => {
  let controller: SignController;
  let accountsService: AccountsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AccountsModule],
      controllers: [SignController],
    })
      .overrideModule(DatabaseModule)
      .useModule(MockDatabaseModule)
      .compile();

    controller = module.get<SignController>(SignController);
    accountsService = module.get<AccountsService>(AccountsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('verify', async () => {
    jest.spyOn(accountsService, 'isLive').mockResolvedValue(true);
    expect((await controller.verify(1)).result).toBeTruthy();

    jest.spyOn(accountsService, 'isLive').mockResolvedValue(false);
    expect((await controller.verify(2)).result).toBeFalsy();
  });
});
