import { format } from 'date-fns';
import { User } from '../entities/user.entity';
import { Result } from '@app/types';

export interface IUsersRegisterDto {
  nickName?: string;
  accountUid?: number;
}

export interface IUsersUuidDto extends Pick<User, 'uuid'> {}

export class UsersMeResultDto {
  user: {
    nickName: string;
    createdAt: string;
  };

  other: {
    uuid: string;
    nickName: string;
    createdAt: string;
  }[];

  setUser(user: User) {
    this.user = {
      nickName: user.nickName,
      createdAt: format(user.createdAt, 'yyyy-MM-dd HH:mm:ss'),
    };
  }

  setOther(users: User[]) {
    this.other = users.map((user) => ({
      uuid: user.uuid,
      nickName: user.nickName,
      createdAt: format(user.createdAt, 'yyyy-MM-dd HH:mm:ss'),
    }));
  }
}

export interface IUsersMeResult extends Result<UsersMeResultDto> {}

export interface IUsersUpdateProfileDto extends IUsersUuidDto {
  nickName?: string;
}
