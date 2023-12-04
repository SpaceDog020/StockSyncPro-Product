import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from 'dotenv';
config();

const MONGODB_URI = process.env.MONGODB_URI;
@Module({
  imports: [MongooseModule.forRoot(MONGODB_URI),ProductModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
