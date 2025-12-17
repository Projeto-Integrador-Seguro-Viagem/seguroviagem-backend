import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ApoliceService } from '../services/apolices.service';
import { Apolice } from '../entities/apolices.entity';

@Controller('apolices')
export class ApoliceController {
  constructor(private readonly apoliceService: ApoliceService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Apolice[]> {
    return this.apoliceService.findAll();
  }
  
  @Get('destino/:destino')
  @HttpCode(HttpStatus.OK)
  findByDestino(@Param('destino') destino: string): Promise<Apolice[]> {
    return this.apoliceService.findByDestino(destino);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findById(@Param('id', ParseIntPipe) id: number): Promise<Apolice> {
    return this.apoliceService.findById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() apolice: Apolice): Promise<Apolice> {
    return this.apoliceService.create(apolice);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() apolice: Partial<Apolice>,
  ): Promise<Apolice> {
    return this.apoliceService.update(id, apolice);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.apoliceService.delete(id);
  }
}