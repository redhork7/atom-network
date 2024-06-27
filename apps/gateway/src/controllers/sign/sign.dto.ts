import { JwtToken } from '@app/auth';
import {
  ISignInWithAccountDto,
  ISignUpWithAccountDto,
} from 'apps/atom-network/src/sign/sign.dto';
import {
  AccountsFindUidByDto,
  AccountsRegisterDto,
} from '../accounts/accounts.dto';
import { ApiProperty } from '@nestjs/swagger';

export class SignInWithAccountDto
  extends AccountsFindUidByDto
  implements ISignInWithAccountDto {}

export class SignUpWithAccountDto
  extends AccountsRegisterDto
  implements ISignUpWithAccountDto {}

export class SignRefreshTokenDto extends JwtToken {}

export class SignOutDto {
  @ApiProperty({ description: '기기 고유번호 (client 에서 생성)' })
  deviceUid: number;
}
