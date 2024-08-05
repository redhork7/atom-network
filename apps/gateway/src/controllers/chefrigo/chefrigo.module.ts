import { Module } from '@nestjs/common';
import ChefrigoProvider from '../../proxy-providers/chefrigo';
import { UsersController } from './users/users.controller';
import { HomesController } from './homes/homes.controller';
import { FamiliesController } from './families/families.controller';
import { FoodsController } from './foods/foods.controller';

@Module({
  providers: [ChefrigoProvider],
  controllers: [
    UsersController,
    HomesController,
    FamiliesController,
    FoodsController,
  ],
})
export class ChefrigoModule {}
