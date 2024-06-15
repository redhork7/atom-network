import { ApiProperty } from '@nestjs/swagger';

export class AccountsRegisterDto {
  @ApiProperty({ required: false, description: '계정 아이디 (로그인)' })
  id?: string;

  @ApiProperty({ required: false, description: '계정 비밀번호 (로그인)' })
  password?: string;
}

export class AccountsFindUidByDto {
  @ApiProperty({ description: '계정 아이디 (로그인)' })
  id: string;

  @ApiProperty({ description: '계정 비밀번호 (로그인)' })
  password: string;
}

export class AccountsChangePasswordDto {
  @ApiProperty({ description: '현재 비밀번호' })
  currentPassword: string;

  @ApiProperty({ description: '신규 비밀번호' })
  newPassword: string;
}
