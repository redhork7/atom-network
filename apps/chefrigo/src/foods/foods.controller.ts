import { Controller } from '@nestjs/common';
import { FoodsService } from './foods.service';
import { MessagePattern } from '@nestjs/microservices';
import {
  CmdFoodsAdd,
  CmdFoodsGetListByFamily,
  CmdFoodsGetListByHome,
  CmdFoodsGetListWithoutHome,
  CmdFoodsRemove,
  CmdFoodsUpdate,
} from './foods.cmd';
import {
  IFoodsAddDto,
  IFoodsGetListByFamilyDto,
  IFoodsGetListByHomeDto,
  IFoodsGetListWithoutHomeDto,
  IFoodsRemoveDto,
  IFoodsUpdateDto,
} from './foods.dto';
import { EmptyResult, Result, UidResult } from '@app/types';
import { Food } from '../entities/food.entity';

@Controller()
export class FoodsController {
  constructor(private readonly foodsService: FoodsService) {}

  @MessagePattern({ cmd: CmdFoodsAdd })
  async add(dto: IFoodsAddDto): Promise<UidResult> {
    return { result: true, data: await this.foodsService.add(dto) };
  }

  @MessagePattern({ cmd: CmdFoodsRemove })
  async remove(dto: IFoodsRemoveDto): Promise<EmptyResult> {
    return { result: await this.foodsService.remove(dto) };
  }

  @MessagePattern({ cmd: CmdFoodsUpdate })
  async update(dto: IFoodsUpdateDto): Promise<EmptyResult> {
    return { result: await this.foodsService.update(dto) };
  }

  @MessagePattern({ cmd: CmdFoodsGetListByFamily })
  async getListByFamily(
    dto: IFoodsGetListByFamilyDto,
  ): Promise<Result<{ foods: Food[]; total: number }>> {
    return { result: true, data: await this.foodsService.getListByFamily(dto) };
  }

  @MessagePattern({ cmd: CmdFoodsGetListByHome })
  async getListByHome(
    dto: IFoodsGetListByHomeDto,
  ): Promise<Result<{ foods: Food[]; total: number }>> {
    return { result: true, data: await this.foodsService.getListByHome(dto) };
  }

  @MessagePattern({ cmd: CmdFoodsGetListWithoutHome })
  async getListWithoutHome(
    dto: IFoodsGetListWithoutHomeDto,
  ): Promise<Result<{ foods: Food[]; total: number }>> {
    return {
      result: true,
      data: await this.foodsService.getListWithoutHome(dto),
    };
  }
}
