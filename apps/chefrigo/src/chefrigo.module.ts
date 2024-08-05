import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validate as validateDatabaseEnv } from '@app/database/env.validate';
import { resolve } from 'path';
import { ChefrigoController } from './chefrigo.controller';
import { ChefrigoService } from './chefrigo.service';
import { UsersModule } from './users/users.module';
import { HomesModule } from './homes/homes.module';
import { FamiliesModule } from './families/families.module';
import { FoodsModule } from './foods/foods.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [
        resolve(__dirname, '../../../../../../.env.chefrigo'),
        resolve(__dirname, '../../../../../../.env.gateway'),
      ],
      validate: (config) => {
        return validateDatabaseEnv(config);
      },
    }),
    UsersModule,
    HomesModule,
    FamiliesModule,
    FoodsModule,
  ],
  controllers: [ChefrigoController],
  providers: [ChefrigoService],
})
export class ChefrigoModule {}
