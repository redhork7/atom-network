import {
  IAccountsFindUidByDto,
  IAccountsRegisterDto,
} from '../accounts/accounts.dto';

export interface ISignInWithAccountDto extends IAccountsFindUidByDto {}

export interface ISignUpWithAccountDto extends IAccountsRegisterDto {}
