import { Test, TestingModule } from '@nestjs/testing';
import { AccountsController } from './accounts.controller';
import { AccountsService } from './accounts.service';
import { MockDatabaseModule } from '@app/database/test-utils/mock-database.module';
import { AccountsRepository } from './accounts.repository';

describe('AccountsController', () => {
  let controller: AccountsController;
  let accountsService: AccountsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [MockDatabaseModule],
      providers: [AccountsService, AccountsRepository],
      controllers: [AccountsController],
    }).compile();

    controller = module.get<AccountsController>(AccountsController);
    accountsService = module.get<AccountsService>(AccountsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('change password', async () => {
    jest.spyOn(accountsService, 'changePassword').mockResolvedValue(true);
    expect(
      (
        await controller.changePassword({
          uid: 1,
          currentPassword: 'test-current-password',
          newPassword: 'test-new-password',
        })
      ).result,
    ).toBeTruthy();
  });

  it('expire', async () => {
    jest.spyOn(accountsService, 'expire').mockResolvedValue(true);
    expect((await controller.expire(1)).result).toBeTruthy();
  });
});
