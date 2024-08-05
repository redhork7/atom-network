import { PageDto } from '@app/types';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';

export class FoodsAddDto {
  @ApiProperty({ required: false, description: '장소 고유번호' })
  @Expose()
  @IsNumber()
  @IsOptional()
  homeUid?: number;

  @ApiProperty({ description: '생성시 발급받은 문자열 아이디' })
  @Expose()
  @IsString()
  uuid: string;

  @ApiProperty({ description: '음식명' })
  @Expose()
  @IsString()
  name: string;

  @ApiProperty({ description: '음식 태그 목록 (없을 시, 빈 배열 전달)' })
  @Expose()
  @IsArray()
  tags: string[];
}

export class FoodsRemoveDto {
  @ApiProperty({ description: '음식 고유번호' })
  @Expose()
  @IsNumber()
  foodUid: number;

  @ApiProperty({ description: '생성시 발급받은 문자열 아이디' })
  @Expose()
  @IsString()
  uuid: string;
}

export class FoodsUpdateDto {
  @ApiProperty({ description: '음식 고유번호' })
  @Expose()
  @IsNumber()
  foodUid: number;

  @ApiProperty({ required: false, description: '장소 고유번호' })
  @Expose()
  @IsNumber()
  @IsOptional()
  homeUid?: number;

  @ApiProperty({ description: '생성시 발급받은 문자열 아이디' })
  @Expose()
  @IsString()
  uuid: string;

  @ApiProperty({ description: '음식명' })
  @Expose()
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ description: '음식 태그 목록 (없을 시, 빈 배열 전달)' })
  @Expose()
  @IsArray()
  @IsOptional()
  tags?: string[];
}

export class FoodsGetListByFamilyDto extends PageDto {
  @ApiProperty({ description: '생성시 발급받은 문자열 아이디' })
  @Expose()
  @IsString()
  uuid: string;
}

export class FoodsGetListByHomeDto extends PageDto {
  @ApiProperty({ description: '생성시 발급받은 문자열 아이디' })
  @Expose()
  @IsString()
  uuid: string;

  @ApiProperty({ description: '장소 고유번호' })
  @Expose()
  @IsString()
  homeUid: number;
}

export class FoodsGetListWithoutHomeDto {
  @ApiProperty({ description: '생성시 발급받은 문자열 아이디' })
  @Expose()
  @IsString()
  uuid: string;
}
