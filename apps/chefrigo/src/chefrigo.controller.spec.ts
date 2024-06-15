import { Test, TestingModule } from '@nestjs/testing';
import { ChefrigoController } from './chefrigo.controller';
import { ChefrigoService } from './chefrigo.service';

describe('ChefrigoController', () => {
  let chefrigoController: ChefrigoController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ChefrigoController],
      providers: [ChefrigoService],
    }).compile();

    chefrigoController = app.get<ChefrigoController>(ChefrigoController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(chefrigoController.getHello()).toBe('Hello World!');
    });
  });
});
