import { Test, TestingModule } from '@nestjs/testing';
import { FamiliesService } from './families.service';
import { FamiliesRepository } from './families.repository';
import { MockDatabaseModule } from '@app/database/test-utils/mock-database.module';
import {
  deleteSpy,
  existsBySpy,
  findBySpy,
  findOneBySpy,
  saveSpy,
  updateSpy,
} from '@app/database/test-utils/spy';
import {
  mockAnotherUser,
  mockFamiles,
  mockHome,
  mockUser,
} from '../test-utils/mock';

describe('FamiliesService', () => {
  let service: FamiliesService;
  let familiesRepository: FamiliesRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [MockDatabaseModule],
      providers: [FamiliesService, FamiliesRepository],
    }).compile();

    service = module.get<FamiliesService>(FamiliesService);
    familiesRepository = module.get<FamiliesRepository>(FamiliesRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('add, remove, update, get home list', async () => {
    existsBySpy(familiesRepository, true);

    saveSpy(familiesRepository, mockFamiles[1]);
    expect(
      await service.add({
        accountUid: mockUser.accountUid,
        userUuid: mockAnotherUser.uuid,
        homeUid: mockHome.uid,
      }),
    ).toBe(mockFamiles[1].uid);

    findOneBySpy(familiesRepository, mockFamiles[1]);

    deleteSpy(familiesRepository, 1);
    expect(
      await service.remove({
        accountUid: mockUser.accountUid,
        familyUid: mockFamiles[1].uid,
      }),
    ).toBeTruthy();

    updateSpy(familiesRepository, 1);
    expect(
      await service.update({
        accountUid: mockUser.accountUid,
        familyUid: mockFamiles[1].uid,
        name: 'some-familiy',
      }),
    ).toBeTruthy();

    findBySpy(familiesRepository, mockFamiles);
    expect(
      (
        await service.getHomeList({
          accountUid: mockUser.accountUid,
          uuid: mockUser.uuid,
        })
      ).length,
    ).toBe(2);
  });
});
