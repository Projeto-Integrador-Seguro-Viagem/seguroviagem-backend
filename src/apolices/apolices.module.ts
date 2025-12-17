import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Apolice } from './entities/apolices.entity';
import { ApoliceService } from './services/apolices.service';
import { ApoliceController } from './controller/apolices.controller';


@Module({
  imports: [TypeOrmModule.forFeature([Apolice])],
  providers: [ApoliceService],
  controllers: [ApoliceController],
  exports: [ApoliceService],
})
export class ApoliceModule {}
