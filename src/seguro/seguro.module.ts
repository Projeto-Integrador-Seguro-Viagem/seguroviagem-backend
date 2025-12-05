import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
    imports: [TypeOrmModule.forFeature([ContratoModule])],
    providers: [],
    controllers: [],
    exports: [],
})

export  class ContratoModule{}