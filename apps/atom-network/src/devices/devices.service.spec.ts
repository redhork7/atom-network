import { Test, TestingModule } from '@nestjs/testing';
import { DevicesService } from './devices.service';
import { DevicesRepository } from './devices.repository';
import { MockDatabaseModule } from '@app/database/test-utils/mock-database.module';
import {
  createQueryBuilderSpy,
  findOneBySpy,
  saveSpy,
} from '@app/database/test-utils/spy';
import { Device } from '../entities/device.entity';

describe('DevicesService', () => {
  let service: DevicesService;
  let devicesRepository: DevicesRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [MockDatabaseModule],
      providers: [DevicesService, DevicesRepository],
    }).compile();

    service = module.get<DevicesService>(DevicesService);
    devicesRepository = module.get<DevicesRepository>(DevicesRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('register', async () => {
    findOneBySpy<Device>(devicesRepository, { uid: 1 });
    saveSpy<Device>(devicesRepository, { uid: 1 });
    expect(
      await service.register({
        uuid: 'test-uuid',
        userAgent: 'test-userAgent',
      }),
    ).toBe(1);
  });

  it('set owner and free', async () => {
    createQueryBuilderSpy<any>(devicesRepository, 1);
    expect(await service.setOwner({ uid: 1, accountUid: 1 })).toBeTruthy();
    expect(await service.setFree({ uid: 1 })).toBeTruthy();
  });
});
