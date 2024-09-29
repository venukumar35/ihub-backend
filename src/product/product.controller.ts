import { Controller, Get, Post, Body, Patch, Param, Request, ParseIntPipe, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('product')
export class ProductController {
  constructor(
    private readonly productService: ProductService
) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto,  @Request() req,) {
    const userId = req.user.id;
    return this.productService.create(createProductDto,userId);
  }

  @Get()
  findAll( @Query('page', ParseIntPipe) page: number,
  @Query('searchQuery') searchQuery: string,) {
    return this.productService.findAll(page,searchQuery);
  }


}
