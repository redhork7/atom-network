import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class FamiliesAddDto {
  @ApiProperty({ description: '장소 고유번호' })
  @Expose()
  @IsNumber()
  homeUid: number;

  @ApiProperty({ description: '가족으로 추가할 사용자의 문자열 아이디' })
  @Expose()
  @IsString()
  userUuid: string;
}

export class FamiliesRemoveDto {
  @ApiProperty({ description: '가족 고유번호' })
  @Expose()
  @IsNumber()
  familyUid: number;
}

export class FamiliesUpdateDto {
  @ApiProperty({ description: '가족 고유번호' })
  @Expose()
  @IsNumber()
  familyUid: number;

  @ApiProperty({ required: false, description: '가족 별칭' })
  @Expose()
  @IsString()
  @IsOptional()
  familyName?: string;
}

export class FamiliesGetHomeListDto {
  @ApiProperty({ description: '현재 사용자의 uuid' })
  @Expose()
  @IsString()
  userUuid: string;
}
