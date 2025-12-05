import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contrato } from './seguro/entities/contrato.entity';
import { ContratoModule } from './seguro/seguro.module';

// Decorator - Eqtiqueta de metadados eles mudam o comprtamento inicial de uma classe ou um metodo
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '83626122.Ends',
      database: 'db_seguroviagem',
      entities: [Contrato],
      synchronize: true,
      logging: true,
    }),
    ContratoModule
  ],

  controllers: [],
  providers: [],
})
export class AppModule {} 
