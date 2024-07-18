import { Result } from '@app/types';
import { Home } from '../entities/home.entity';
import { User } from '../entities/user.entity';
import { format } from 'date-fns';

export interface IHomesRegisterDto extends Pick<User, 'uuid'> {
  placeName?: string;
}

export interface IHomesUpdateDto extends Pick<User, 'uuid'> {
  uid: number;
  placeName?: string;
}

export interface IHomesHideDto extends Pick<User, 'uuid'> {
  uid: number;
}

export interface IHomesGetHiddenListDto extends Pick<User, 'uuid'> {}

export class HomesGetHiddenListResultDto {
  homes: (Pick<Home, 'uid' | 'placeName'> & { hiddenAt: string })[];

  setHomes(homes: Home[]) {
    this.homes = homes.map((home) => ({
      uid: home.uid,
      placeName: home.placeName,
      hiddenAt: format(home.hiddenAt, 'yyyy-MM-dd HH:mm:ss'),
    }));
  }
}

export interface IHomesGetHiddenListResult
  extends Result<HomesGetHiddenListResultDto> {}

export interface IHomesShowDto extends Pick<User, 'uuid'> {
  uid: number;
}
