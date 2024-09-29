import { Injectable } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { CartRepository } from './cart.repository';

@Injectable()
export class CartService {
  constructor (private readonly repo:CartRepository){}
async createCart(createCartDto:CreateCartDto,userId:string) {
    return await this.repo.createCart(createCartDto,userId)
  }
  async findAll(page:number,searchQuery:string,userId:string) {
    return  await this.repo.findAll(page,searchQuery,userId)
  }

  async removeCart(id:number,userId:number){
    return  await this.repo.removeCart(id,userId)
  }
 }
