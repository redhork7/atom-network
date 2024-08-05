import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class PageDto {
  @ApiProperty({ description: '조회 페이지 (1부터 시작)' })
  @Expose()
  @IsNumber()
  page: number;

  @ApiProperty({ description: '조회 개수' })
  @Expose()
  @IsNumber()
  size: number;

  static filter(dto: { page: string; size: string } & any): PageDto & any {
    return { ...dto, page: +dto.page, size: +dto.size };
  }
}
