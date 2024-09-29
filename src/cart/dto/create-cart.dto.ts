import { IsString } from "class-validator";

export class CreateCartDto {
    @IsString()
    productId : string
}
