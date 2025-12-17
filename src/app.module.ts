import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './usuarios/entities/usuarios.entity';
import { UsuarioModule } from './usuarios/usuarios.module';
import { ApoliceModule } from './apolices/apolices.module';
import { Apolice } from './apolices/entities/apolices.entity';
import { TipoModule } from './tipo/tipo.module';
import { Tipo } from './tipo/entities/tipo.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'db_seguroviagem',
      entities: [Apolice, Usuario, Tipo],
      synchronize: true,
      logging: true,
    }),
   ApoliceModule,
   UsuarioModule,
   TipoModule,
   AuthModule
  ],

  controllers: [],
  providers: [],
})
export class AppModule {} 
