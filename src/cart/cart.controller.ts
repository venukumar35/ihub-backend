import { Controller, Get, Post, Body, Patch, Param, Request, ParseIntPipe, Query, UseGuards } from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { middleware } from 'src/gaurd/auth_gaurd';

@UseGuards(middleware)
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post("/add")
  create(@Body() createCartDto: CreateCartDto,  @Request() req) {
    const userId = req.user.id;
    
    return this.cartService.createCart(createCartDto,userId);
  }

  @Get()
  findAll( @Query('page', ParseIntPipe) page: number,
     @Query('searchQuery') searchQuery: string,
     @Request() req,) {
      const userId = req.user.id;
    return this.cartService.findAll(page,searchQuery,userId);
  }
  @Patch('/remove/:id')
  removeCart(@Param('id') id: string, @Request() req,) {    
    const userId = req.user.id;
    return this.cartService.removeCart(+id,userId);
  }
}
