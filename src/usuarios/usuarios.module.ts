import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './entities/usuarios.entity';
import { UsuarioService } from './services/usuarios.service';
import { UsuarioController } from './controllers/usuarios.controller';


@Module({
  imports: [TypeOrmModule.forFeature([Usuario])], 
  providers: [UsuarioService],
  controllers: [UsuarioController],
  exports: [UsuarioService],
})
export class UsuarioModule {}