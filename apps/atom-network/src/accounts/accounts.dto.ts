export interface IAccountsRegisterDto {
  id?: string;
  password?: string;
}

export interface IAccountsFindUidByDto {
  id: string;
  password: string;
}

export interface IAccountsChangePasswordDto {
  uid: number;
  currentPassword: string;
  newPassword: string;
}
