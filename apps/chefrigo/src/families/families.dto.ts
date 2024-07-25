import { Result } from '@app/types';
import { User } from '../entities/user.entity';

export interface IFamiliesAddDto extends Required<Pick<User, 'accountUid'>> {
  homeUid: number;
  userUuid: string;
}

export interface IFamiliesRemoveDto extends Required<Pick<User, 'accountUid'>> {
  familyUid: number;
}

export interface IFamiliesUpdateDto extends Required<Pick<User, 'accountUid'>> {
  familyUid: number;
  name?: string;
}

export interface IFamiliesGetHomeListDto
  extends Required<Pick<User, 'accountUid' | 'uuid'>> {}

export class FamiliesGetHomeListResultDto {
  homes: {
    homeUid: number;
    placeName?: string;
    family: {
      familyUid: number;
      userUuid: string;
      nickName?: string;
    }[];
    isBelonged: boolean;
    familyUid?: number;
    familyName?: string;
  }[];
}

export interface IFamiliesGetHomeListResult
  extends Result<FamiliesGetHomeListResultDto> {}
