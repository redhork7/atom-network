import { Controller } from '@nestjs/common';
import { SignInService } from './sign-in.service';
import { UidResult } from '@app/types';
import { ISignInWithAccountDto } from '../sign.dto';
import { MessagePattern } from '@nestjs/microservices';
import { CmdSignInWithAccount } from '../sign.cmd';

@Controller()
export class SignInController {
  constructor(private readonly signInService: SignInService) {}

  @MessagePattern({ cmd: CmdSignInWithAccount })
  async withAccount(dto: ISignInWithAccountDto): Promise<UidResult> {
    const uid = await this.signInService.withAccount(dto);

    return { result: true, data: uid };
  }
}
