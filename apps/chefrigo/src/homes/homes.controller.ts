import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { HomesService } from './homes.service';
import {
  CmdHomesGetHiddenList,
  CmdHomesHide,
  CmdHomesRegister,
  CmdHomesShow,
  CmdHomesUpdate,
} from './homes.cmd';
import {
  HomesGetHiddenListResultDto,
  IHomesGetHiddenListDto,
  IHomesGetHiddenListResult,
  IHomesHideDto,
  IHomesRegisterDto,
  IHomesShowDto,
  IHomesUpdateDto,
} from './homes.dto';
import { EmptyResult, UidResult } from '@app/types';

@Controller()
export class HomesController {
  constructor(private readonly homesService: HomesService) {}

  @MessagePattern({ cmd: CmdHomesRegister })
  async register(dto: IHomesRegisterDto): Promise<UidResult> {
    return { result: true, data: await this.homesService.register(dto) };
  }

  @MessagePattern({ cmd: CmdHomesUpdate })
  async update(dto: IHomesUpdateDto): Promise<EmptyResult> {
    return { result: await this.homesService.update(dto) };
  }

  @MessagePattern({ cmd: CmdHomesHide })
  async hide(dto: IHomesHideDto): Promise<EmptyResult> {
    return { result: await this.homesService.hide(dto) };
  }

  @MessagePattern({ cmd: CmdHomesGetHiddenList })
  async getHiddenList(
    dto: IHomesGetHiddenListDto,
  ): Promise<IHomesGetHiddenListResult> {
    const homes = await this.homesService.getHiddenList(dto);
    const resultDto = new HomesGetHiddenListResultDto();

    resultDto.setHomes(homes);

    return { result: true, data: resultDto };
  }

  @MessagePattern({ cmd: CmdHomesShow })
  async show(dto: IHomesShowDto): Promise<EmptyResult> {
    return { result: await this.homesService.show(dto) };
  }
}
