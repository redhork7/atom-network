import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { format } from 'date-fns';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('check alive', () => {
    it('shoud return the current timestamp', () => {
      expect(appController.ping()).toBe(format(new Date(), 'yyyyMMdd'));
    });
  });
});
