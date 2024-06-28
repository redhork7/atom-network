import { Injectable } from '@nestjs/common';
import { AccountsService } from '../../accounts/accounts.service';
import { ISignInWithAccountDto } from '../sign.dto';

@Injectable()
export class SignInService {
  constructor(private readonly accountsService: AccountsService) {}

  async withAccount(dto: ISignInWithAccountDto): Promise<number> {
    return await this.accountsService.findUidBy(dto);
  }
}
