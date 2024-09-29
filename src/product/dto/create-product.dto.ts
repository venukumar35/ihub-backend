import { IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  description: string;
  @IsString()
  image: string;
  @IsString()
  sellingPrice: string;
  @IsString()
  discountPrice: string;
  @IsString()
  quantity: string;
  @IsString()
  uom: string;
  @IsString()
  hsnCode: string;
}
export class FindAll{
  @IsNumber()
  page: number ;
  @IsString()
  searchQuery: string;
}