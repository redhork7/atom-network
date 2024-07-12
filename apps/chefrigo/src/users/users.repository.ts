import { Inject, Injectable } from '@nestjs/common';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { v4 as uuidv4 } from 'uuid';
import { padStart } from 'lodash';

@Injectable()
export class UsersRepository extends Repository<User> {
  constructor(
    @Inject('DatabaseProvider') private readonly dataSource: DataSource,
  ) {
    super(User, dataSource.createEntityManager());
  }

  async register(data: Partial<User>): Promise<User> {
    if (data.uid) {
      throw new Error('이미 생성된 사용자 정보입니다.');
    }

    return await this.dataSource.transaction(
      async (entityManager: EntityManager): Promise<User> => {
        const seedUuid = uuidv4();
        const user = await entityManager.save(User, {
          ...data,
          uuid: `${padStart('', 31, '9')}-${seedUuid}`,
        });
        const userUuid = `${padStart(`${user.uid}`, 31, '0')}-${seedUuid}`;

        await entityManager.update<User>(
          User,
          { uid: user.uid },
          { uuid: userUuid },
        );

        return { ...user, uuid: userUuid } as User;
      },
    );
  }
}
