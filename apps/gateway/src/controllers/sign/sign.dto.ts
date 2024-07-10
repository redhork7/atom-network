import { JwtToken } from '@app/auth';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

export class SignUpWithAccountDto {
  @ApiProperty({ required: false, description: '계정 아이디 (로그인)' })
  @Expose()
  @IsString()
  id: string;

  @ApiProperty({ required: false, description: '계정 비밀번호 (로그인)' })
  @Expose()
  @IsString()
  password: string;
}

export class SignInWithAccountDto {
  @ApiProperty({ description: '계정 아이디 (로그인)' })
  @Expose()
  @IsString()
  id: string;

  @ApiProperty({ description: '계정 비밀번호 (로그인)' })
  @Expose()
  @IsString()
  password: string;
}

export class SignRefreshTokenDto extends JwtToken {}

export class SignOutDto {
  @ApiProperty({ description: '기기 고유번호 (client 에서 생성)' })
  @Expose()
  @IsNumber()
  deviceUid: number;
}
