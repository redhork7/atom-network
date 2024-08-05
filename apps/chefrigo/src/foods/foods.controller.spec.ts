import { Test, TestingModule } from '@nestjs/testing';
import { FoodsController } from './foods.controller';
import { MockDatabaseModule } from '@app/database/test-utils/mock-database.module';
import { FoodsRepository } from './foods.repository';
import { FoodsService } from './foods.service';
import { deleteSpy, updateSpy } from '@app/database/test-utils/spy';
import { mockFood, mockUser, mockHome, mockFoods } from '../test-utils/mock';

describe('FoodsController', () => {
  let controller: FoodsController;
  let foodsRepository: FoodsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [MockDatabaseModule],
      providers: [FoodsService, FoodsRepository],
      controllers: [FoodsController],
    }).compile();

    controller = module.get<FoodsController>(FoodsController);
    foodsRepository = module.get<FoodsRepository>(FoodsRepository);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('add, remove, update', async () => {
    jest.spyOn(foodsRepository, 'add').mockResolvedValue(mockFood);
    expect(
      (
        await controller.add({
          uuid: mockUser.uuid,
          homeUid: mockHome.uid,
          ...mockFood,
        })
      ).data,
    ).toBe(mockFood.uid);

    jest.spyOn(foodsRepository, 'isOwned').mockResolvedValue(true);
    deleteSpy(foodsRepository, 1);
    expect(
      (await controller.remove({ uuid: mockUser.uuid, uid: mockFood.uid }))
        .result,
    ).toBeTruthy();

    jest.spyOn(foodsRepository, 'isBelonged').mockResolvedValue(true);
    updateSpy(foodsRepository, 1);
    expect(
      (
        await controller.update({
          uuid: mockUser.uuid,
          uid: mockFood.uid,
          ...mockFoods[1],
        })
      ).result,
    ).toBeTruthy();
  });

  it('get list by family, home, without home', async () => {
    jest.spyOn(foodsRepository, 'isBelonged').mockResolvedValue(true);

    jest
      .spyOn(foodsRepository, 'getListByFamily')
      .mockResolvedValue([mockFoods, mockFoods.length]);
    expect(
      (
        await controller.getListByFamily({
          uuid: mockUser.uuid,
          page: 1,
          size: 20,
        })
      ).data.total,
    ).toBe(4);

    jest
      .spyOn(foodsRepository, 'getListByHome')
      .mockResolvedValue([mockFoods, mockFoods.length]);
    expect(
      (
        await controller.getListByHome({
          uuid: mockUser.uuid,
          page: 1,
          size: 20,
          homeUid: mockHome.uid,
        })
      ).data.total,
    ).toBe(4);

    jest
      .spyOn(foodsRepository, 'getListWithoutHome')
      .mockResolvedValue([mockFoods, mockFoods.length]);
    expect(
      (
        await controller.getListWithoutHome({
          uuid: mockUser.uuid,
          page: 1,
          size: 20,
        })
      ).data.total,
    ).toBe(4);
  });
});
