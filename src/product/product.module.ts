import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { PrismaService } from 'database/db';
import { ProductRepository } from './product.repository';

@Module({
  controllers: [ProductController],
  providers: [ProductService,PrismaService,ProductRepository],
})
export class ProductModule {}
