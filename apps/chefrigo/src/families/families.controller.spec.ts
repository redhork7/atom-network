import { Test, TestingModule } from '@nestjs/testing';
import { FamiliesController } from './families.controller';
import { MockDatabaseModule } from '@app/database/test-utils/mock-database.module';
import { FamiliesService } from './families.service';
import { FamiliesRepository } from './families.repository';
import {
  existsBySpy,
  saveSpy,
  findOneBySpy,
  deleteSpy,
  updateSpy,
  findBySpy,
} from '@app/database/test-utils/spy';
import {
  mockFamiles,
  mockUser,
  mockAnotherUser,
  mockHome,
} from '../test-utils/mock';

describe('FamiliesController', () => {
  let controller: FamiliesController;
  let familiesRepository: FamiliesRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [MockDatabaseModule],
      providers: [FamiliesService, FamiliesRepository],
      controllers: [FamiliesController],
    }).compile();

    controller = module.get<FamiliesController>(FamiliesController);
    familiesRepository = module.get<FamiliesRepository>(FamiliesRepository);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('add, remove, update, get home list', async () => {
    existsBySpy(familiesRepository, true);

    saveSpy(familiesRepository, mockFamiles[1]);
    expect(
      (
        await controller.add({
          accountUid: mockUser.accountUid,
          userUuid: mockAnotherUser.uuid,
          homeUid: mockHome.uid,
        })
      ).data,
    ).toBe(mockFamiles[1].uid);

    findOneBySpy(familiesRepository, mockFamiles[1]);

    deleteSpy(familiesRepository, 1);
    expect(
      (
        await controller.remove({
          accountUid: mockUser.accountUid,
          familyUid: mockFamiles[1].uid,
        })
      ).result,
    ).toBeTruthy();

    updateSpy(familiesRepository, 1);
    expect(
      (
        await controller.update({
          accountUid: mockUser.accountUid,
          familyUid: mockFamiles[1].uid,
          name: 'some-familiy',
        })
      ).result,
    ).toBeTruthy();

    findBySpy(familiesRepository, mockFamiles);
    expect(
      (
        await controller.getHomeList({
          accountUid: mockUser.accountUid,
          uuid: mockUser.uuid,
        })
      ).data.homes.length,
    ).toBe(2);
  });
});
