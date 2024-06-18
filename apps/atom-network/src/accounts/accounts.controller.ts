import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AccountsService } from './accounts.service';
import { EmptyResult } from '@app/types';
import { IAccountsChangePasswordDto } from './accounts.dto';
import { CmdAccountsChangePassword, CmdAccountsExpire } from './accounts.cmd';

@Controller()
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @MessagePattern({ cmd: CmdAccountsChangePassword })
  async changePassword(dto: IAccountsChangePasswordDto): Promise<EmptyResult> {
    return { result: !!(await this.accountsService.changePassword(dto)) };
  }

  @MessagePattern({ cmd: CmdAccountsExpire })
  async expire(uid: number): Promise<EmptyResult> {
    return { result: !!(await this.accountsService.expire(uid)) };
  }
}
