import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from 'database/db';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { CartModule } from './cart/cart.module';
import { TransactionModule } from './transaction/transaction.module';
import { CountryModule } from './country/country.module';
import { AuthModule } from './auth/auth.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [UserModule, ProductModule, CartModule, TransactionModule,CountryModule,AuthModule,
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), './public/images'),
      serveRoot: '/api/img',
    }),
  ],
  controllers: [AppController],
  providers: [AppService,PrismaService],
})
export class AppModule {}
