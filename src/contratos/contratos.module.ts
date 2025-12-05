import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contrato } from './entities/contratos.entity';
import { ContratoService } from './services/contratos.service';
import { ContratosController } from './controller/contratos.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Contrato])],
  providers: [ContratoService],
  controllers: [ContratosController],
  exports: [ContratoService],
})
export class ContratoModule {}
