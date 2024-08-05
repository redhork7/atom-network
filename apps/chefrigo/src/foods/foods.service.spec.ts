import { Test, TestingModule } from '@nestjs/testing';
import { FoodsService } from './foods.service';
import { MockDatabaseModule } from '@app/database/test-utils/mock-database.module';
import { FoodsRepository } from './foods.repository';
import { mockFood, mockFoods, mockHome, mockUser } from '../test-utils/mock';
import { deleteSpy, updateSpy } from '@app/database/test-utils/spy';

describe('FoodsService', () => {
  let service: FoodsService;
  let foodsRepository: FoodsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [MockDatabaseModule],
      providers: [FoodsService, FoodsRepository],
    }).compile();

    service = module.get<FoodsService>(FoodsService);
    foodsRepository = module.get<FoodsRepository>(FoodsRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('add, remove, update', async () => {
    jest.spyOn(foodsRepository, 'add').mockResolvedValue(mockFood);
    expect(
      await service.add({
        uuid: mockUser.uuid,
        homeUid: mockHome.uid,
        ...mockFood,
      }),
    ).toBe(mockFood.uid);

    jest.spyOn(foodsRepository, 'isOwned').mockResolvedValue(true);
    deleteSpy(foodsRepository, 1);
    expect(
      await service.remove({ uuid: mockUser.uuid, uid: mockFood.uid }),
    ).toBeTruthy();

    jest.spyOn(foodsRepository, 'isBelonged').mockResolvedValue(true);
    updateSpy(foodsRepository, 1);
    expect(
      await service.update({
        uuid: mockUser.uuid,
        uid: mockFood.uid,
        ...mockFoods[1],
      }),
    ).toBeTruthy();
  });

  it('get list by family, home, without home', async () => {
    jest.spyOn(foodsRepository, 'isBelonged').mockResolvedValue(true);

    jest
      .spyOn(foodsRepository, 'getListByFamily')
      .mockResolvedValue([mockFoods, mockFoods.length]);
    expect(
      (
        await service.getListByFamily({
          uuid: mockUser.uuid,
          page: 1,
          size: 20,
        })
      ).total,
    ).toBe(4);

    jest
      .spyOn(foodsRepository, 'getListByHome')
      .mockResolvedValue([mockFoods, mockFoods.length]);
    expect(
      (
        await service.getListByHome({
          uuid: mockUser.uuid,
          page: 1,
          size: 20,
          homeUid: mockHome.uid,
        })
      ).total,
    ).toBe(4);

    jest
      .spyOn(foodsRepository, 'getListWithoutHome')
      .mockResolvedValue([mockFoods, mockFoods.length]);
    expect(
      (
        await service.getListWithoutHome({
          uuid: mockUser.uuid,
          page: 1,
          size: 20,
        })
      ).total,
    ).toBe(4);
  });
});
