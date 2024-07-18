import { padStart } from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { User } from '../entities/user.entity';
import { Home } from '../entities/home.entity';

export const mockUser: User = {
  uid: 1,
  uuid: `${padStart('1', 31, '0')}-${uuidv4()}`,
  nickName: 'mock-user',
  createdAt: new Date(),
  updatedAt: new Date(),
  foods: [],
  families: [],
};

export const mockAnotherUser: User = {
  uid: 2,
  uuid: `${padStart('2', 31, '0')}-${uuidv4()}`,
  nickName: 'mock-another-user',
  createdAt: new Date(),
  updatedAt: new Date(),
  foods: [],
  families: [],
};

export const mockUsers = [mockUser, mockAnotherUser];

export const mockHome: Home = {
  uid: 1,
  placeName: 'mock-home',
  createdAt: new Date(),
  updatedAt: new Date(),
  hiddenAt: undefined,
  foods: [],
  families: [],
};
