import { Injectable } from '@nestjs/common';
import { PrismaService } from 'database/db';
import { CreateProductDto } from './dto/create-product.dto';
import { PaginationResponse } from 'utils/common';

@Injectable()
export class ProductRepository {
  constructor(private readonly prisma: PrismaService) {}
async create(dto:CreateProductDto,userId:string){
   await this.prisma.product.create({
    data:{
      description:dto.description,
      image:dto.image,
      hsnCode:dto.hsnCode,
      quantity:+dto.quantity,
      sellingPrice:+dto.sellingPrice,
      uom:dto.uom,
      createdBy: +userId,
    }
   })
}
async findAll(page:number,searchQuery:string){
  const itemsPerPage=10
  const data = await this.prisma.product.findMany({
    where:{
      quantity: {
        gt: 0
      },
      ...(searchQuery.length > 0 && {
        OR: [
          {description:{
            contains:searchQuery.length > 0 ? searchQuery : undefined,
          },},
         { uom:{
            contains:searchQuery.length > 0 ? searchQuery : undefined,
          },},
          {hsnCode:{
            contains:searchQuery.length > 0 ? searchQuery : undefined,
          },}
        ],
      }),
       
      isActive:true,
    },
    // skip: page == null || page == 0 ? 0 : (page - 1) * itemsPerPage,
    // take:page == null || page == 0 ? undefined : itemsPerPage ,
  })
  return PaginationResponse(page, data.length, itemsPerPage, data);
}
}
