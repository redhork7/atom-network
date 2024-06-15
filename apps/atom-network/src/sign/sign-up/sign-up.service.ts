import { AuthService, JwtToken } from '@app/auth';
import { Injectable } from '@nestjs/common';
import { AccountsService } from '../../accounts/accounts.service';
import { SignUpWithAccountDto } from '../sign.dto';
import { AccountsRegisterDto } from '../../accounts/accounts.dto';

@Injectable()
export class SignUpService {
  constructor(
    private readonly authService: AuthService,
    private readonly accountsService: AccountsService,
  ) {}

  async withAccount(dto: SignUpWithAccountDto): Promise<JwtToken> {
    const uid = await this.accountsService.register(dto as AccountsRegisterDto);
    const jwtToken = await this.authService.issueToken({ uid });

    return jwtToken;
  }
}
