import { Inject, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Family } from '../entities/family.entity';
import { User } from '../entities/user.entity';

@Injectable()
export class FamiliesRepository extends Repository<Family> {
  constructor(
    @Inject('DatabaseProvider') private readonly dataSource: DataSource,
  ) {
    super(Family, dataSource.createEntityManager());
  }

  async add(
    accountUid: number,
    userUuid: string,
    homeUid: number,
  ): Promise<Family> {
    const { uid: userUid } = await this.dataSource
      .getRepository(User)
      .findOneByOrFail({ uuid: userUuid, accountUid });

    return await this.save({ user: { uid: userUid }, home: { uid: homeUid } });
  }
}
