import { Test, TestingModule } from '@nestjs/testing';
import { DevicesController } from './devices.controller';
import { MockDatabaseModule } from '@app/database/test-utils/mock-database.module';
import { DevicesService } from './devices.service';
import { DevicesRepository } from './devices.repository';

describe('DevicesController', () => {
  let controller: DevicesController;
  let devicesService: DevicesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [MockDatabaseModule],
      providers: [DevicesService, DevicesRepository],
      controllers: [DevicesController],
    }).compile();

    controller = module.get<DevicesController>(DevicesController);
    devicesService = module.get<DevicesService>(DevicesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('register', async () => {
    jest.spyOn(devicesService, 'register').mockResolvedValue(1);
    expect(
      (
        await controller.register({
          uuid: 'test-uuid',
          userAgent: 'test-userAgent',
        })
      ).result,
    ).toBeTruthy();
  });

  it('set owner and free', async () => {
    jest.spyOn(devicesService, 'setOwner').mockResolvedValue(true);
    expect(
      (
        await controller.setOwner({
          uid: 1,
          accountUid: 1,
        })
      ).result,
    ).toBeTruthy();

    jest.spyOn(devicesService, 'setFree').mockResolvedValue(true);
    expect(
      (
        await controller.setFree({
          uid: 1,
        })
      ).result,
    ).toBeTruthy();
  });
});
