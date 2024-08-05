import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

export class HomesRegisterDto {
  @ApiProperty({ description: '생성시 발급받은 문자열 아이디' })
  @Expose()
  @IsString()
  uuid: string;

  @ApiProperty({ required: false, description: '장소 별칭' })
  @Expose()
  @IsString()
  @IsOptional()
  placeName?: string;
}

export class HomesUpdateDto {
  @ApiProperty({ description: '생성시 발급받은 문자열 아이디' })
  @Expose()
  @IsString()
  uuid: string;

  @ApiProperty({ description: '장소 고유번호' })
  @Expose()
  @IsString()
  homeUid: number;

  @ApiProperty({ required: false, description: '장소 별칭' })
  @Expose()
  @IsString()
  @IsOptional()
  placeName?: string;
}

export class HomesHideDto {
  @ApiProperty({ description: '생성시 발급받은 문자열 아이디' })
  @Expose()
  @IsString()
  uuid: string;

  @ApiProperty({ description: '장소 고유번호' })
  @Expose()
  @IsString()
  homeUid: number;
}

export class HomesGetHiddenListDto {
  @ApiProperty({ description: '생성시 발급받은 문자열 아이디' })
  @Expose()
  @IsString()
  homeUid: string;
}

export class HomesShowDto extends HomesHideDto {}
