import { Injectable } from '@nestjs/common';
import { PrismaService } from 'database/db';
import { PaginationResponse } from 'utils/common';
import { CreateCartDto } from './dto/create-cart.dto';

@Injectable()
export class CartRepository {
  constructor(private readonly prisma: PrismaService) {}
  async createCart(createCartDto:CreateCartDto,userId:string){
     await this.prisma.addCart.create({
        data:{
            productId:+createCartDto.productId,
            userId:+userId,
            isActiveCart:true
        }
     })
  }
  async findAll(page:number,searchQuery:string,userId:string){
    const itemsPerPage=10
    const data = await this.prisma.addCart.findMany({
      where:{
        userId:+userId,
        isActiveCart:true
      },
      include:{
        product:{
          select:{
            description:true,
            discountPrice:true,
            quantity:true,
            hsnCode:true,
            image:true,
            uom:true
          }
        }
      },
      skip: page == null || page == 0 ? 0 : (page - 1) * itemsPerPage,
      take: itemsPerPage,
    })
    return PaginationResponse(page, data.length, itemsPerPage, data);
  }
  async removeCart(id:number,userId:number){
      await this.prisma.addCart.updateMany({
        where:{
            userId:+userId,
            id:id
        },
        data:{
            isActiveCart:false
        }
      })
  }
}
