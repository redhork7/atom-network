import { JwtToken } from '@app/auth';
import {
  AccountsFindUidByDto,
  AccountsRegisterDto,
} from '../accounts/accounts.dto';

export class SignInWithAccountDto extends AccountsFindUidByDto {}

export class SignUpWithAccountDto extends AccountsRegisterDto {}

export class SignRefreshTokenDto extends JwtToken {}
