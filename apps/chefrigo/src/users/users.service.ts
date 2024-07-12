import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import {
  IUsersRegisterDto,
  IUsersUpdateProfileDto,
  IUsersUuidDto,
} from './users.dto';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async getUsers(accountUid: number): Promise<User[]> {
    return await this.usersRepository.findBy({ accountUid });
  }

  private async checkMaxUsersForAccount(accountUid: number): Promise<boolean> {
    const numberOfUsers = (await this.getUsers(accountUid)).length;

    if (numberOfUsers >= 5) {
      throw new Error('최대 5명까지 등록할 수 있습니다.');
    }

    return true;
  }

  async register(dto: IUsersRegisterDto): Promise<string> {
    // check maximum account
    dto.accountUid && this.checkMaxUsersForAccount(dto.accountUid);

    const { uuid } = await this.usersRepository.register({
      ...dto,
    });

    return uuid;
  }

  async getUser(dto: IUsersUuidDto): Promise<User> {
    return await this.usersRepository.findOneByOrFail(dto);
  }

  async updateProfile({
    uuid,
    ...dto
  }: IUsersUpdateProfileDto): Promise<boolean> {
    const result = await this.usersRepository.update({ uuid }, { ...dto });

    return result.affected > 0;
  }
}
