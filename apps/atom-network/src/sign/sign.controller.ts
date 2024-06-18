import { EmptyResult } from '@app/types';
import { Controller } from '@nestjs/common';
import { AccountsService } from '../accounts/accounts.service';
import { MessagePattern } from '@nestjs/microservices';
import { CmdSignVerify } from './sign.cmd';

@Controller()
export class SignController {
  constructor(private readonly accountsService: AccountsService) {}

  @MessagePattern({ cmd: CmdSignVerify })
  async verify(uid: number): Promise<EmptyResult> {
    return { result: !!(await this.accountsService.isLive(uid)) };
  }
}
