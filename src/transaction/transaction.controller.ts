import { Controller, Get, Post, Body,Request, ParseIntPipe, Query, UseGuards } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto, PriceCalculationDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { middleware } from 'src/gaurd/auth_gaurd';
@UseGuards(middleware)
@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}
  @Post()
  create(@Body() createTransactionDto: CreateTransactionDto, @Request() req,) {
    const userId = req.user.id;
    return this.transactionService.create(createTransactionDto,userId);
  }
  @Post('/logout')
  async userLogout( @Request() req,) {
    const userId = req.user.id;
    return this.transactionService.userLogout(userId);
  }
  
  @Get()
  findAll( @Query('page', ParseIntPipe) page: number,
  @Query('searchQuery') searchQuery: string, @Request() req,) {
    const userId = req.user.id;
    return this.transactionService.findAll(page,searchQuery,userId);
  }
}
