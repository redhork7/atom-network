import { Inject, Injectable } from '@nestjs/common';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { Home } from '../entities/home.entity';
import { User } from '../entities/user.entity';
import { Family } from '../entities/family.entity';

@Injectable()
export class HomesRepository extends Repository<Home> {
  constructor(
    @Inject('DatabaseProvider') private readonly dataSource: DataSource,
  ) {
    super(Home, dataSource.createEntityManager());
  }

  async isBelonged(uuid: string, uid: number): Promise<boolean> {
    return await this.dataSource
      .getRepository(Family)
      .createQueryBuilder('family')
      .withDeleted()
      .leftJoin('family.user', 'user')
      .leftJoin('family.home', 'home')
      .where('user.uuid = :uuid', { uuid })
      .andWhere('home.uid = :uid', { uid })
      .getExists();
  }

  async register(uuid: string, data: Partial<Home>): Promise<Home> {
    return this.dataSource.transaction(async (entityManager: EntityManager) => {
      const user = await entityManager.findOneByOrFail(User, { uuid });
      const numberOfHomes = await entityManager.count(Family, {
        where: { user: { uid: user.uid } },
        withDeleted: true,
      });

      if (!user.accountUid && numberOfHomes > 0) {
        throw new Error('비회원의 경우, 1개만 등록이 가능합니다.');
      }

      // makes new home and links it with the user.
      const home = await entityManager.save(Home, data);

      entityManager.save(Family, { user, home });

      return home;
    });
  }

  async getHiddenList(uuid: string): Promise<Home[]> {
    return await this.createQueryBuilder('home')
      .withDeleted()
      .leftJoin('home.families', 'family')
      .leftJoin('family.user', 'user')
      .where('user.uuid = :uuid', { uuid })
      .where('home.hidden_at is not null')
      .getMany();
  }
}
