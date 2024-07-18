import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import {
  CmdUsersMe,
  CmdUsersRegister,
  CmdUsersUpdateProfile,
} from './users.cmd';
import {
  IUsersMeResult,
  IUsersRegisterDto,
  IUsersUpdateProfileDto,
  IUsersUuidDto,
  UsersMeResultDto,
} from './users.dto';
import { EmptyResult, Result } from '@app/types';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern({ cmd: CmdUsersRegister })
  async register(dto: IUsersRegisterDto): Promise<Result<string>> {
    return { result: true, data: await this.usersService.register(dto) };
  }

  @MessagePattern({ cmd: CmdUsersMe })
  async me(dto: IUsersUuidDto): Promise<IUsersMeResult> {
    const resultDto = new UsersMeResultDto();
    const user = await this.usersService.getUser(dto);
    let other = [];

    if (user.accountUid) {
      other = (await this.usersService.getUsers(user.accountUid)).filter(
        (each) => each.uid !== user.uid,
      );
    }

    resultDto.setUser(user);
    resultDto.setOther(other);

    return { result: true, data: resultDto };
  }

  @MessagePattern({ cmd: CmdUsersUpdateProfile })
  async updateProfile(dto: IUsersUpdateProfileDto): Promise<EmptyResult> {
    return { result: !!(await this.usersService.updateProfile(dto)) };
  }
}
