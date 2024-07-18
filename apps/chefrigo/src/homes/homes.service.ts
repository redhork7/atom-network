import { Injectable } from '@nestjs/common';
import { HomesRepository } from './homes.repository';
import {
  IHomesGetHiddenListDto,
  IHomesHideDto,
  IHomesRegisterDto,
  IHomesShowDto,
  IHomesUpdateDto,
} from './homes.dto';
import { Home } from '../entities/home.entity';

@Injectable()
export class HomesService {
  constructor(private readonly homesRepository: HomesRepository) {}

  async isBelonged(uuid: string, uid: number): Promise<true> {
    const isBelonged = await this.homesRepository.isBelonged(uuid, uid);

    if (!isBelonged) {
      throw new Error('내 장소가 아닙니다.');
    }

    return true;
  }

  async register({ uuid, ...dto }: IHomesRegisterDto): Promise<number> {
    const { uid } = await this.homesRepository.register(uuid, dto);

    return uid;
  }

  async update({ uuid, uid, ...dto }: IHomesUpdateDto): Promise<boolean> {
    await this.isBelonged(uuid, uid);

    const { affected } = await this.homesRepository.update({ uid }, dto);

    return affected > 0;
  }

  async hide({ uuid, uid }: IHomesHideDto): Promise<boolean> {
    await this.isBelonged(uuid, uid);

    const { affected } = await this.homesRepository.softDelete({ uid });

    return affected > 0;
  }

  async getHiddenList({ uuid }: IHomesGetHiddenListDto): Promise<Home[]> {
    return await this.homesRepository.getHiddenList(uuid);
  }

  async show({ uuid, uid }: IHomesShowDto): Promise<boolean> {
    await this.isBelonged(uuid, uid);

    const { affected } = await this.homesRepository.restore({ uid });

    return affected > 0;
  }
}
