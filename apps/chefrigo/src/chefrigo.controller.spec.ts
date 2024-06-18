import { Test, TestingModule } from '@nestjs/testing';
import { ChefrigoController } from './chefrigo.controller';
import { ChefrigoService } from './chefrigo.service';
import { format } from 'date-fns';

describe('ChefrigoController', () => {
  let chefrigoController: ChefrigoController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ChefrigoController],
      providers: [ChefrigoService],
    }).compile();

    chefrigoController = app.get<ChefrigoController>(ChefrigoController);
  });

  describe('check alive', () => {
    it('shoud return the current timestamp', () => {
      expect(chefrigoController.ping()).toBe(format(new Date(), 'yyyyMMdd'));
    });
  });
});
