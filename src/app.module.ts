import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './usuarios/entities/usuarios.entity';
import { UsuarioModule } from './usuarios/usuarios.module';
import { ApoliceModule } from './apolices/apolices.module';
import { Apolice } from './apolices/entities/apolices.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'db_seguroviagem',
      entities: [Apolice, Usuario],
      synchronize: true,
      logging: true,
    }),
   ApoliceModule,
   UsuarioModule
  ],

  controllers: [],
  providers: [],
})
export class AppModule {} 
