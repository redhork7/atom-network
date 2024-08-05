import { Inject, Injectable } from '@nestjs/common';
import { DataSource, In, IsNull, Repository } from 'typeorm';
import { Food } from '../entities/food.entity';
import { IFoodsAddDto } from './foods.dto';
import { Family } from '../entities/family.entity';
import { User } from '../entities/user.entity';

@Injectable()
export class FoodsRepository extends Repository<Food> {
  constructor(
    @Inject('DatabaseProvider') private readonly dataSource: DataSource,
  ) {
    super(Food, dataSource.createEntityManager());
  }

  async isBelonged(userUuid: string, homeUid: number): Promise<boolean> {
    return await this.dataSource.getRepository(Family).exists({
      relations: ['user'],
      where: { user: { uuid: userUuid }, home: { uid: homeUid } },
    });
  }

  async isOwned(userUuid: string, foodUid: number): Promise<boolean> {
    const food = await this.findOneOrFail({
      relations: ['user'],
      where: { uid: foodUid },
      select: ['user'],
    });
    const user = await this.dataSource
      .getRepository(User)
      .findOneByOrFail({ uuid: userUuid });

    // check whether the user added the food directly.
    if (food.user.uid === user.uid) {
      return true;
    }

    // check whether the user belongs the home where the food was added.
    if (
      food.home &&
      (await this.dataSource
        .getRepository(Family)
        .existsBy({ user, home: food.home }))
    ) {
      return true;
    }

    return false;
  }

  async add({ uuid, homeUid, ...data }: IFoodsAddDto): Promise<Food> {
    if (homeUid && !this.isBelonged(uuid, homeUid)) {
      throw new Error('속해있는 장소가 아닙니다.');
    }

    return await this.save({
      ...data,
      user: await this.dataSource.getRepository(User).findOneByOrFail({ uuid }),
      home: { uid: homeUid },
    });
  }

  async getListByFamily(
    uuid: string,
    page = 1,
    size = 20,
  ): Promise<[Food[], number]> {
    const homeUids = (
      await this.dataSource
        .getRepository(Family)
        .createQueryBuilder('family')
        .leftJoin('family.user', 'user')
        .where('user.uuid = :uuid', { uuid })
        .select('family.home.uid', 'uid')
        .getRawMany()
    ).map(({ uid }) => uid);

    return await this.findAndCount({
      where: { home: { uid: In(homeUids) } },
      skip: (page - 1) * size,
      take: size,
    });
  }

  async getListByHome(
    homeUid: number,
    page = 1,
    size = 20,
  ): Promise<[Food[], number]> {
    return await this.findAndCount({
      where: { home: { uid: homeUid } },
      skip: (page - 1) * size,
      take: size,
    });
  }

  async getListWithoutHome(
    uuid: string,
    page = 1,
    size = 20,
  ): Promise<[Food[], number]> {
    return await this.findAndCount({
      where: { user: { uuid: uuid }, home: IsNull() },
      skip: (page - 1) * size,
      take: size,
    });
  }
}
