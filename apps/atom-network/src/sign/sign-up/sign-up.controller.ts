import { Controller } from '@nestjs/common';
import { ISignUpWithAccountDto } from '../sign.dto';
import { SignUpService } from './sign-up.service';
import { MessagePattern } from '@nestjs/microservices';
import { CmdSignUpWithAccount } from '../sign.cmd';
import { UidResult } from '@app/types';

@Controller()
export class SignUpController {
  constructor(private readonly signUpService: SignUpService) {}

  @MessagePattern({ cmd: CmdSignUpWithAccount })
  async withAccount(dto: ISignUpWithAccountDto): Promise<UidResult> {
    const uid = await this.signUpService.withAccount(dto);

    return { result: true, data: uid };
  }
}
