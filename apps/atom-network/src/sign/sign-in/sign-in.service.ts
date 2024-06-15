import { AuthService, JwtToken } from '@app/auth';
import { Injectable } from '@nestjs/common';
import { AccountsService } from '../../accounts/accounts.service';
import { SignInWithAccountDto } from '../sign.dto';
import { AccountsFindUidByDto } from '../../accounts/accounts.dto';

@Injectable()
export class SignInService {
  constructor(
    private readonly authService: AuthService,
    private readonly accountsService: AccountsService,
  ) {}

  async withAccount(dto: SignInWithAccountDto): Promise<JwtToken> {
    const uid = await this.accountsService.findUidBy(
      dto as AccountsFindUidByDto,
    );
    const jwtToken = await this.authService.issueToken({ uid });

    return jwtToken;
  }
}
