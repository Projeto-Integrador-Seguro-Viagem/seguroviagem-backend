import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Put } from '@nestjs/common';
import { TipoService } from '../services/tipo.service';
import { Tipo } from '../entities/tipo.entity';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';


@UseGuards(JwtAuthGuard)
@Controller('tipo')
export class TipoController {
    constructor(private readonly tipoService: TipoService) { }

    @Post()

    create(@Body() createTipoDto: Partial<Tipo>) {
        return this.tipoService.create(createTipoDto);
    }

    @Get()
    findAll() {
        return this.tipoService.findAll();
    }

@Get('busca/:nome') 
findByNome(@Param('nome') nome: string) {
    return this.tipoService.findByNome(nome); 
}

    // @Get('calculo-seguro')
    // calculate(
    //     @Query('startDate') startDate: string,
    //     @Query('endDate') endDate: string,
    //     @Query('destination') destination: string,
    //     @Query('dailyPrice') dailyPrice: number,
    // ) {
    //     return this.tipoService.calculateInsurancePrice(startDate, endDate, destination, dailyPrice);
    // }

    @Get(':id')
    findById(@Param('id') id: string) { 
        return this.tipoService.findById(+id);
    }

    @Put(':id') // 1. Adicionado o decorador de rota
    async update(@Param('id') id: string, @Body() updateTipoDto: Partial<Tipo>) {
    // 2. Chama o Service (é no Service que a lógica de banco deve ficar)
    return await this.tipoService.update(+id, updateTipoDto);
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.tipoService.delete(+id);
    }
}
