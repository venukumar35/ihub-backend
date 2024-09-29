import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductRepository } from './product.repository';

@Injectable()
export class ProductService {
  constructor (private readonly repo:ProductRepository){}

 async create(createProductDto: CreateProductDto,userId:string) {
    return await this.repo.create(createProductDto,userId)
  }

  async findAll(page:number,searchQuery:string) {
    return  await this.repo.findAll(page,searchQuery)
  }
}
