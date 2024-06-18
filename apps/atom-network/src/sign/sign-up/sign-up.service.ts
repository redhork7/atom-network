import { Injectable } from '@nestjs/common';
import { AccountsService } from '../../accounts/accounts.service';
import { ISignUpWithAccountDto } from '../sign.dto';
import { IAccountsRegisterDto } from '../../accounts/accounts.dto';

@Injectable()
export class SignUpService {
  constructor(private readonly accountsService: AccountsService) {}

  async withAccount(dto: ISignUpWithAccountDto): Promise<number> {
    const uid = await this.accountsService.register(
      dto as IAccountsRegisterDto,
    );

    return uid;
  }
}
