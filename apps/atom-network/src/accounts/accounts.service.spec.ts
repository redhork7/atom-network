import { Test, TestingModule } from '@nestjs/testing';
import { AccountsService } from './accounts.service';
import { MockDatabaseModule } from '@app/database/test-utils/mock-database.module';
import { AccountsRepository } from './accounts.repository';
import {
  findOneByOrFailSpy,
  findOneBySpy,
  saveSpy,
  softRemoveSpy,
  updateSpy,
} from '@app/database/test-utils/spy';
import { Account } from '../entities/account.entity';

describe('AccountsService', () => {
  let service: AccountsService;
  let accountsRepository: AccountsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [MockDatabaseModule],
      providers: [AccountsService, AccountsRepository],
    }).compile();

    service = module.get<AccountsService>(AccountsService);
    accountsRepository = module.get<AccountsRepository>(AccountsRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('register, change password, expire', async () => {
    const dto = {
      id: 'testId1009',
      password: 'testpwd#1009',
    };

    findOneBySpy<Account>(accountsRepository, null);
    saveSpy<Account>(accountsRepository, { uid: 1 });
    expect(await service.register(dto)).toBe(1);

    findOneBySpy<Account>(accountsRepository, { uid: 1, ...dto });
    updateSpy(accountsRepository, 1);
    expect(
      await service.changePassword(1, {
        currentPassword: dto.password,
        newPassword: `${dto.password}9001`,
      }),
    ).toBe(true);

    findOneByOrFailSpy<Account>(accountsRepository, { uid: 1 });
    softRemoveSpy<Account>(accountsRepository, {
      uid: 1,
      expiredAt: new Date(),
    });
    expect(await service.expire(1)).toBe(true);

    softRemoveSpy<Account>(accountsRepository, {
      uid: 1,
    });
    expect(await service.expire(1)).toBe(false);
  });

  it('find uid, check living', async () => {
    const dto = {
      uid: 1,
      id: 'testId1009',
      password: 'testpwd#1009',
      expiredAt: new Date(),
    };

    findOneByOrFailSpy(accountsRepository, dto);
    expect(await service.findUidBy(dto)).toBe(1);
    expect(await service.isLive(1)).toBe(false);
  });
});
