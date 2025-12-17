import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tipo } from './entities/tipo.entity';
import { TipoController } from './controller/tipo.controller';
import { TipoService } from './services/tipo.service';


@Module({
  imports: [TypeOrmModule.forFeature([Tipo])],
  providers: [TipoService],
  controllers: [TipoController],
  exports: [TipoService],
})
export class TipoModule {}
