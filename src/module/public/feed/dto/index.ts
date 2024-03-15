import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class FeedQueryDTO {
  @IsOptional()
  @IsString()
  readonly author: string;

  @IsOptional()
  @IsString()
  readonly favorite: string;

  @IsOptional()
  @IsString()
  readonly tag: string;

  @IsNumber()
  @Transform(({ value }) => {
    const val = Number(value);
    if (val < 0) return 0;
    return val;
  })
  readonly limit: number;

  @IsNumber()
  @Transform(({ value }) => {
    const val = Number(value);
    if (val < 0) return 0;
    return val;
  })
  readonly skip: number;
}
