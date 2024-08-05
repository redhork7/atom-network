import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

export class UsersRegisterDto {
  @ApiProperty({ required: false, description: '닉네임' })
  @Expose()
  @IsString()
  @IsOptional()
  nickName?: string;
}

export class UsersMeDto {
  @ApiProperty({ description: '생성시 발급받은 문자열 아이디' })
  @Expose()
  @IsString()
  uuid: string;
}

export class UsersUpdateProfileDto {
  @ApiProperty({ description: '생성시 발급받은 문자열 아이디' })
  @Expose()
  @IsString()
  uuid: string;

  @ApiProperty({ required: false, description: '닉네임' })
  @Expose()
  @IsString()
  @IsOptional()
  nickName?: string;
}
