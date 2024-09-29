import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { PrismaService } from 'database/db';
import { transactionRepository } from './transaction.repository';

@Module({
  controllers: [TransactionController],
  providers: [TransactionService,PrismaService,transactionRepository],
})
export class TransactionModule {}
