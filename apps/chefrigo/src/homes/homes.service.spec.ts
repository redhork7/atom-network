import { Test, TestingModule } from '@nestjs/testing';
import { HomesService } from './homes.service';
import { HomesRepository } from './homes.repository';
import { MockDatabaseModule } from '@app/database/test-utils/mock-database.module';
import { mockHome, mockUser } from '../test-utils/mock';
import {
  restoreSpy,
  softDeleteSpy,
  updateSpy,
} from '@app/database/test-utils/spy';

describe('HomesService', () => {
  let service: HomesService;
  let homesRepository: HomesRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [MockDatabaseModule],
      providers: [HomesService, HomesRepository],
    }).compile();

    service = module.get<HomesService>(HomesService);
    homesRepository = module.get<HomesRepository>(HomesRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('register', async () => {
    jest.spyOn(homesRepository, 'register').mockResolvedValue(mockHome);
    expect(
      await service.register({
        uuid: mockUser.uuid,
        placeName: mockHome.placeName,
      }),
    ).toBe(mockHome.uid);
  });

  it('update', async () => {
    jest.spyOn(homesRepository, 'isBelonged').mockResolvedValue(true);
    updateSpy(homesRepository, 1);
    expect(await service.update({ ...mockUser, ...mockHome })).toBeTruthy();
  });

  it('hide, get all hidden list, show', async () => {
    jest.spyOn(homesRepository, 'isBelonged').mockResolvedValue(true);

    softDeleteSpy(homesRepository, 1);
    expect(await service.hide({ ...mockUser, ...mockHome })).toBeTruthy();

    jest.spyOn(homesRepository, 'getHiddenList').mockResolvedValue([mockHome]);
    expect((await service.getHiddenList(mockUser)).length).toBe(1);

    restoreSpy(homesRepository, 1);
    expect(await service.show({ ...mockUser, ...mockHome })).toBeTruthy();
  });
});
