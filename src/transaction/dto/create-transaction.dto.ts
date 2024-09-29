import {  IsString } from 'class-validator';
export class CreateTransactionDto {
    @IsString()
    productId: string;
    @IsString()
    transId: string;
    @IsString()
    quantity: string;
    @IsString()
    totalPrice:string
}
export class PriceCalculationDto {
    @IsString()
    productId: string;
    @IsString()
    quantity: string;
    price:string
}