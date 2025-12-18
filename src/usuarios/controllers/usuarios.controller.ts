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
  UseGuards,
} from '@nestjs/common';
import { Usuario } from '../entities/usuarios.entity';
import { UsuarioService } from '../services/usuarios.service';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';

@Controller('/usuarios')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Usuario[]> {
    return this.usuarioService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  findById(@Param('id', ParseIntPipe) id: number): Promise<Usuario> {
    return this.usuarioService.findById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/email/:email')
  @HttpCode(HttpStatus.OK)
  findByUsuario(@Param('email') email: string): Promise<Usuario> {
    return this.usuarioService.findByUsuario(email);
  }

  @Post('cadastrar')
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() usuario: Usuario): Promise<Usuario> {
    return this.usuarioService.create(usuario);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() usuario: Usuario,
  ): Promise<Usuario> {
    usuario.id = id;
    return this.usuarioService.update(usuario);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.usuarioService.delete(id);
  }
}
