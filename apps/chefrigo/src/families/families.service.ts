import { Injectable } from '@nestjs/common';
import { FamiliesRepository } from './families.repository';
import {
  IFamiliesAddDto,
  IFamiliesGetHomeListDto,
  IFamiliesRemoveDto,
  IFamiliesUpdateDto,
} from './families.dto';
import { Family } from '../entities/family.entity';

@Injectable()
export class FamiliesService {
  constructor(private readonly familiesRepository: FamiliesRepository) {}

  async checkHas(accountUid: number, homeUid: number): Promise<true> {
    const has = await this.familiesRepository.existsBy({
      user: { accountUid },
      home: { uid: homeUid },
    });

    if (!has) {
      throw new Error('내 장소가 아닙니다.');
    }

    return true;
  }

  async add(dto: IFamiliesAddDto): Promise<number> {
    await this.checkHas(dto.accountUid, dto.homeUid);

    const { uid } = await this.familiesRepository.add(
      dto.accountUid,
      dto.userUuid,
      dto.homeUid,
    );

    return uid;
  }

  async remove(dto: IFamiliesRemoveDto): Promise<boolean> {
    const { home } = await this.familiesRepository.findOneBy({
      uid: dto.familyUid,
    });
    const result = (await this.checkHas(dto.accountUid, home.uid))
      ? await this.familiesRepository.delete({
          uid: dto.familyUid,
        })
      : { affected: 0 };

    return result.affected > 0;
  }

  async update({
    accountUid,
    familyUid,
    ...dto
  }: IFamiliesUpdateDto): Promise<boolean> {
    const { home } = await this.familiesRepository.findOneBy({
      uid: familyUid,
    });
    const result = (await this.checkHas(accountUid, home.uid))
      ? await this.familiesRepository.update({ uid: familyUid }, dto)
      : { affected: 0 };

    return result.affected > 0;
  }

  async getHomeList(dto: IFamiliesGetHomeListDto): Promise<Family[]> {
    console.log(dto);
    const families = await this.familiesRepository.findBy({
      user: { accountUid: dto.accountUid },
    });
    const results: Family[] = families
      .reduce((collection, family) => {
        const index = collection.findIndex(
          (item) => item.home.uid === family.home.uid,
        );
        if (index >= 0) {
          collection[index] =
            family.user.uuid === dto.uuid ? family : collection[index];
        } else {
          collection.push(family);
        }

        return collection;
      }, [] as Family[])
      .map((item) => {
        item.home.families = families.filter(
          (family) => item.home.uid === family.home.uid,
        );

        return item;
      });

    return results;
  }
}
