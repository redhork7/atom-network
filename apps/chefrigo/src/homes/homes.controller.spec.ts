import { Test, TestingModule } from '@nestjs/testing';
import { HomesController } from './homes.controller';
import { MockDatabaseModule } from '@app/database/test-utils/mock-database.module';
import { HomesService } from './homes.service';
import { HomesRepository } from './homes.repository';
import {
  updateSpy,
  softDeleteSpy,
  restoreSpy,
} from '@app/database/test-utils/spy';
import { mockHome, mockUser } from '../test-utils/mock';

describe('HomesController', () => {
  let controller: HomesController;
  let homesRepository: HomesRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [MockDatabaseModule],
      providers: [HomesService, HomesRepository],
      controllers: [HomesController],
    }).compile();

    controller = module.get<HomesController>(HomesController);
    homesRepository = module.get<HomesRepository>(HomesRepository);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('register', async () => {
    jest.spyOn(homesRepository, 'register').mockResolvedValue(mockHome);
    expect(
      (
        await controller.register({
          uuid: mockUser.uuid,
          placeName: mockHome.placeName,
        })
      ).data,
    ).toBe(mockHome.uid);
  });

  it('update', async () => {
    jest.spyOn(homesRepository, 'isBelonged').mockResolvedValue(true);
    updateSpy(homesRepository, 1);
    expect(
      (await controller.update({ ...mockUser, ...mockHome })).result,
    ).toBeTruthy();
  });

  it('hide, get all hidden list, show', async () => {
    jest.spyOn(homesRepository, 'isBelonged').mockResolvedValue(true);

    softDeleteSpy(homesRepository, 1);
    expect(
      (await controller.hide({ ...mockUser, ...mockHome })).result,
    ).toBeTruthy();

    jest
      .spyOn(homesRepository, 'getHiddenList')
      .mockResolvedValue([{ ...mockHome, hiddenAt: new Date() }]);
    expect((await controller.getHiddenList(mockUser)).data.homes.length).toBe(
      1,
    );

    restoreSpy(homesRepository, 1);
    expect(
      (await controller.show({ ...mockUser, ...mockHome })).result,
    ).toBeTruthy();
  });
});
