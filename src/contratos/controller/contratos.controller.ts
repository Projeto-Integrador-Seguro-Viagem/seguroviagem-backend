import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { Contrato } from '../entities/contratos.entity';
import { ContratoService } from '../services/contratos.service';

@Controller('/contratos')
export class ContratosController {
  constructor(private readonly contratoService: ContratoService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Contrato[]> {
    return this.contratoService.findAll();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  findById(@Param('id', ParseIntPipe) id_Post): Promise<Contrato> {
    return this.contratoService.findById(id_Post);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() contrato: Contrato): Promise<Contrato> {
    return this.contratoService.create(contrato);
  }

  @Put()
  @HttpCode(HttpStatus.OK)
  update(@Body() contrato: Contrato): Promise<Contrato> {
    return this.contratoService.create(contrato);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.contratoService.delete(id);
  }
}
