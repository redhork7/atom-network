import { Food } from '../entities/food.entity';
import { User } from '../entities/user.entity';

export interface IFoodsAddDto extends Pick<User, 'uuid'> {
  homeUid?: number;
  name: string;
  tags: string[];
}

export interface IFoodsRemoveDto
  extends Pick<User, 'uuid'>,
    Pick<Food, 'uid'> {}

export interface IFoodsUpdateDto extends Pick<User, 'uuid'>, Pick<Food, 'uid'> {
  homeUid?: number;
  name?: string;
  tags?: string[];
}

export interface IFoodsGetListByFamilyDto extends Pick<User, 'uuid'> {
  page: number;
  size: number;
}

export interface IFoodsGetListByHomeDto extends Pick<User, 'uuid'> {
  homeUid: number;
  page: number;
  size: number;
}

export interface IFoodsGetListWithoutHomeDto extends Pick<User, 'uuid'> {
  page: number;
  size: number;
}
