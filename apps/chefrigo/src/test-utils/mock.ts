import { padStart } from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { User } from '../entities/user.entity';
import { Home } from '../entities/home.entity';
import { Family } from '../entities/family.entity';
import { Food } from '../entities/food.entity';

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

export const mockAnotherHome: Home = {
  uid: 2,
  placeName: 'mock-another-home',
  createdAt: new Date(),
  updatedAt: new Date(),
  hiddenAt: undefined,
  foods: [],
  families: [],
};

export const mockFamiles: Family[] = [
  {
    uid: 1,
    user: mockUser,
    home: mockHome,
  },
  {
    uid: 2,
    user: mockAnotherUser,
    home: mockHome,
  },
  {
    uid: 3,
    user: mockAnotherUser,
    home: mockAnotherHome,
  },
];

export const mockFood: Food = {
  uid: 1,
  name: 'cheese cake',
  tags: ['cake', 'bakery', 'bread', 'cheese', 'desert'],
  createdAt: new Date(),
  updatedAt: new Date(),
  user: mockUser,
  home: mockHome,
};

export const mockFoods: Food[] = [
  mockFood,
  {
    uid: 2,
    name: 'icecream cake',
    tags: ['cake', 'icecream', 'desert'],
    createdAt: new Date(),
    updatedAt: new Date(),
    user: mockAnotherUser,
    home: mockHome,
  },
  {
    uid: 3,
    name: 'salmon stake',
    tags: ['meet', 'fish', 'lemon'],
    createdAt: new Date(),
    updatedAt: new Date(),
    user: mockUser,
  },
  {
    uid: 4,
    name: 'bulgalbi',
    tags: [],
    createdAt: new Date(),
    updatedAt: new Date(),
    user: mockAnotherUser,
    home: mockAnotherHome,
  },
];
