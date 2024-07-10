import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';

export class AccountsChangePasswordDto {
  @ApiProperty({ description: '현재 비밀번호' })
  @Expose()
  @IsString()
  currentPassword: string;

  @ApiProperty({ description: '신규 비밀번호' })
  @Expose()
  @IsString()
  newPassword: string;
}
