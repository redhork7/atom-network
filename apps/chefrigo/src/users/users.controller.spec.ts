import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { MockDatabaseModule } from '@app/database/test-utils/mock-database.module';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';
import {
  findBySpy,
  findOneByOrFailSpy,
  updateSpy,
} from '@app/database/test-utils/spy';
import { ConfigModule } from '@nestjs/config';
import { mockUser, mockUsers } from '../test-utils/mock';

describe('UsersController', () => {
  let controller: UsersController;
  let usersRepository: UsersRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot(), MockDatabaseModule],
      providers: [UsersService, UsersRepository],
      controllers: [UsersController],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    usersRepository = module.get<UsersRepository>(UsersRepository);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('register, me', async () => {
    findBySpy(usersRepository, mockUsers);
    jest.spyOn(usersRepository, 'register').mockResolvedValue(mockUser);
    expect((await controller.register(mockUser)).data).toBe(mockUser.uuid);

    findOneByOrFailSpy(usersRepository, mockUser);
    expect((await controller.me(mockUser)).data).toBeDefined();
  });

  it('update profile', async () => {
    updateSpy(usersRepository, 1);
    expect((await controller.updateProfile(mockUser)).result).toBeTruthy();
  });
});
