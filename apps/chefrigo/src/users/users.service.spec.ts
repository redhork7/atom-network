import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { MockDatabaseModule } from '@app/database/test-utils/mock-database.module';
import { UsersRepository } from './users.repository';
import {
  findBySpy,
  findOneByOrFailSpy,
  updateSpy,
} from '@app/database/test-utils/spy';
import { mockUser, mockUsers } from '../test-utils/mock';

describe('UsersService', () => {
  let service: UsersService;
  let usersRepository: UsersRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [MockDatabaseModule],
      providers: [UsersService, UsersRepository],
    }).compile();

    service = module.get<UsersService>(UsersService);
    usersRepository = module.get<UsersRepository>(UsersRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('register, me, get users', async () => {
    findBySpy(usersRepository, mockUsers);
    jest.spyOn(usersRepository, 'register').mockResolvedValue(mockUser);
    expect(await service.register(mockUser)).toBe(mockUser.uuid);

    findOneByOrFailSpy(usersRepository, mockUser);
    expect((await service.getUser({ uuid: mockUser.uuid })).nickName).toBe(
      mockUser.nickName,
    );

    expect((await service.getUsers(1)).length).toBe(2);
  });

  it('update profile', async () => {
    updateSpy(usersRepository, 1);
    expect(await service.updateProfile(mockUser)).toBeTruthy();
  });
});
