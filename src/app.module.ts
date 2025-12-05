import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Decorator - Eqtiqueta de metadados eles mudam o comprtamento inicial de uma classe ou um metodo
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'db_seguroviagem',
      entities: [],
      synchronize: true,
      logging: true,
    }),
  ],

  controllers: [],
  providers: [],
})
export class AppModule {} 
