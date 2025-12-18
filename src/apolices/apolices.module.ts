import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Apolice } from './entities/apolices.entity';
import { ApoliceService } from './services/apolices.service';
import { ApoliceController } from './controller/apolices.controller';
import { TipoModule } from '../tipo/tipo.module';
import { Tipo } from '../tipo/entities/tipo.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Apolice,Tipo]),TipoModule],
  providers: [ApoliceService],
  controllers: [ApoliceController],
  exports: [ApoliceService],
})
export class ApoliceModule {}
