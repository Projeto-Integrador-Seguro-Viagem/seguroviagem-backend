import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
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

    @Get('calculo-seguro')
    calculate(
        @Query('startDate') startDate: string,
        @Query('endDate') endDate: string,
        @Query('destination') destination: string,
        @Query('dailyPrice') dailyPrice: number,
    ) {
        return this.tipoService.calculateInsurancePrice(startDate, endDate, destination, dailyPrice);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.tipoService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateTipoDto: Partial<Tipo>) {
        return this.tipoService.update(+id, updateTipoDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.tipoService.remove(+id);
    }
}
