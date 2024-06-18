import { JwtToken } from '@app/auth';
import {
  ISignInWithAccountDto,
  ISignUpWithAccountDto,
} from 'apps/atom-network/src/sign/sign.dto';
import {
  AccountsFindUidByDto,
  AccountsRegisterDto,
} from '../accounts/accounts.dto';

export class SignInWithAccountDto
  extends AccountsFindUidByDto
  implements ISignInWithAccountDto {}

export class SignUpWithAccountDto
  extends AccountsRegisterDto
  implements ISignUpWithAccountDto {}

export class SignRefreshTokenDto extends JwtToken {}
