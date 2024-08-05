import { Injectable } from '@nestjs/common';
import { FoodsRepository } from './foods.repository';
import {
  IFoodsAddDto,
  IFoodsGetListByFamilyDto,
  IFoodsGetListByHomeDto,
  IFoodsGetListWithoutHomeDto,
  IFoodsRemoveDto,
  IFoodsUpdateDto,
} from './foods.dto';
import { Food } from '../entities/food.entity';

@Injectable()
export class FoodsService {
  constructor(private readonly foodsRepository: FoodsRepository) {}

  private async checkIsOwned(userUuid: string, foodUid: number): Promise<true> {
    if (!(await this.foodsRepository.isOwned(userUuid, foodUid))) {
      throw new Error('속해있지 않은 장소의 음식입니다.');
    }

    return true;
  }

  private async checkIsBelonged(
    userUuid: string,
    homeUid: number,
  ): Promise<true> {
    if (!(await this.foodsRepository.isBelonged(userUuid, homeUid))) {
      throw new Error('속해있지 않은 장소입니다.');
    }

    return true;
  }

  async add(dto: IFoodsAddDto): Promise<number> {
    const { uid } = await this.foodsRepository.add(dto);

    return uid;
  }

  async remove(dto: IFoodsRemoveDto): Promise<boolean> {
    this.checkIsOwned(dto.uuid, dto.uid);

    return (await this.foodsRepository.delete(dto.uid)).affected > 0;
  }

  async update({
    uuid,
    homeUid,
    uid,
    ...data
  }: IFoodsUpdateDto): Promise<boolean> {
    this.checkIsOwned(uuid, uid);
    homeUid && this.checkIsBelonged(uuid, homeUid);

    return (
      (
        await this.foodsRepository.update(
          { uid: uid },
          { ...data, ...(homeUid ? { home: { uid: homeUid } } : {}) },
        )
      ).affected > 0
    );
  }

  async getListByFamily(
    dto: IFoodsGetListByFamilyDto,
  ): Promise<{ foods: Food[]; total: number }> {
    const [foods, total] = await this.foodsRepository.getListByFamily(
      dto.uuid,
      dto.page,
      dto.size,
    );

    return { foods, total };
  }

  async getListByHome(
    dto: IFoodsGetListByHomeDto,
  ): Promise<{ foods: Food[]; total: number }> {
    this.checkIsBelonged(dto.uuid, dto.homeUid);

    const [foods, total] = await this.foodsRepository.getListByHome(
      dto.homeUid,
      dto.page,
      dto.size,
    );

    return { foods, total };
  }

  async getListWithoutHome(
    dto: IFoodsGetListWithoutHomeDto,
  ): Promise<{ foods: Food[]; total: number }> {
    const [foods, total] = await this.foodsRepository.getListWithoutHome(
      dto.uuid,
      dto.page,
      dto.size,
    );

    return { foods, total };
  }
}
