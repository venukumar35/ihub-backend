import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { transactionRepository } from './transaction.repository';

@Injectable()
export class TransactionService {
  constructor (private readonly repo :transactionRepository){}
 async create(createTransactionDto: CreateTransactionDto,userId:string) {
    return await this.repo.create(createTransactionDto,userId)
  }

async  findAll(page:number,searchQuery:string,userId:string) {
    return await this.repo.findAll(page,searchQuery,userId)
  }
  async userLogout(userId:string){
    return await this.repo.userLogout(userId)
  }

}
