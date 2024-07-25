import { Controller } from '@nestjs/common';
import { FamiliesService } from './families.service';
import {
  IFamiliesAddDto,
  IFamiliesGetHomeListDto,
  IFamiliesGetHomeListResult,
  IFamiliesRemoveDto,
  IFamiliesUpdateDto,
} from './families.dto';
import { EmptyResult, UidResult } from '@app/types';
import { MessagePattern } from '@nestjs/microservices';
import {
  CmdFamiliesAdd,
  CmdFamiliesGetHomeList,
  CmdFamiliesRemove,
  CmdFamiliesUpdate,
} from './families.cmd';

@Controller()
export class FamiliesController {
  constructor(private readonly familiesService: FamiliesService) {}

  @MessagePattern({ cmd: CmdFamiliesAdd })
  async add(dto: IFamiliesAddDto): Promise<UidResult> {
    return { result: true, data: await this.familiesService.add(dto) };
  }

  @MessagePattern({ cmd: CmdFamiliesRemove })
  async remove(dto: IFamiliesRemoveDto): Promise<EmptyResult> {
    return { result: !!(await this.familiesService.remove(dto)) };
  }

  @MessagePattern({ cmd: CmdFamiliesUpdate })
  async update(dto: IFamiliesUpdateDto): Promise<EmptyResult> {
    return { result: !!(await this.familiesService.update(dto)) };
  }

  @MessagePattern({ cmd: CmdFamiliesGetHomeList })
  async getHomeList(
    dto: IFamiliesGetHomeListDto,
  ): Promise<IFamiliesGetHomeListResult> {
    const families = await this.familiesService.getHomeList(dto);

    return {
      result: true,
      data: {
        homes: families.map((family) => ({
          homeUid: family.home.uid,
          placeName: family.home.placeName,
          family: family.home.families.map((belong) => ({
            familyUid: belong.uid,
            userUuid: belong.user.uuid,
            nickName: belong.user.nickName,
          })),
          isBelonged: family.home.families.reduce(
            (result, current) =>
              current.user.uuid === dto.uuid ? true : result,
            false,
          ),
          familyUid: family.uid,
          familyName: family.name,
        })),
      },
    };
  }
}
