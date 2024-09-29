import { Injectable } from '@nestjs/common';
import { PrismaService } from 'database/db';
import { PaginationResponse } from 'utils/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';

@Injectable()
export class transactionRepository {
  constructor(private readonly prisma: PrismaService) {}
async create(dto:CreateTransactionDto,userId:string){
   await this.prisma.transactions.create({
    data:{
     quantity:+dto.quantity,
     totalPrice:+dto.totalPrice,
     productId:+dto.productId,
     userId:+userId,
     transId:+dto.transId
    }
   })
}
async  findAll(page:number,searchQuery:string,userId:string) {
    const itemsPerPage=10
    const data= await this.prisma.transactions.findMany({
        where:{
            userId:+userId,
            product:{
                description:{
                    contains:searchQuery.length> 0? searchQuery : undefined,
                },
            }
        },
        include:{
            product:{
                select:{
                    description:true,
                }
            }
        },
        skip: page == null || page == 0 ? 0 : (page - 1) * itemsPerPage,
        take: itemsPerPage,
    })
    return PaginationResponse(page, data.length, itemsPerPage, data);

}
async userLogout(usrerId:string){
    return await this.prisma.user.update({
      where:{
        id:+usrerId
      },
      data:{
        token:null
      }
    })
  }
}