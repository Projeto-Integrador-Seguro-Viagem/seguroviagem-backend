import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Usuario } from '../entities/usuarios.entity';


@Injectable()
export class UsuarioService {
    constructor(
        @InjectRepository(Usuario)
        private usuarioRepository: Repository<Usuario>,
    ) { }

    async findAll(): Promise<Usuario[]> {
        return await this.usuarioRepository.find();

    }

    async findById(id: number): Promise<Usuario> {

        const usuario = await this.usuarioRepository.findOne({
            where: {
                id
            }
        });

        if (!usuario)
            throw new HttpException('Usuário não encontrado!', HttpStatus.NOT_FOUND);

        return usuario;

    }

    async findByUsuario(usuario: string): Promise<Usuario> {

        const usuarioEncontrado = await this.usuarioRepository.findOne({
            where: { usuario }
        });

        if (!usuarioEncontrado){
            throw new HttpException('Usuário não encontrado!', HttpStatus.NOT_FOUND);
  }
        return usuarioEncontrado;
}


    async create(usuario: Usuario): Promise<Usuario> {
        
        const buscaUsuario = await this.findByUsuario(usuario.usuario);

        if (buscaUsuario)
            throw new HttpException("Este Usuário já existe!", HttpStatus.BAD_REQUEST);

        return await this.usuarioRepository.save(usuario);

    }

    async update(usuario: Usuario): Promise<Usuario> {

        await this.findById(usuario.id);

        const buscaUsuario = await this.findByUsuario(usuario.usuario);

        if (buscaUsuario && buscaUsuario.id !== usuario.id)
            throw new HttpException('Usuário (e-mail) já Cadastrado!', HttpStatus.BAD_REQUEST);

        return await this.usuarioRepository.save(usuario);

   }

    async delete(id: number): Promise<DeleteResult> {
        await this.findById(id);
        return await this.usuarioRepository.delete(id);
    }
 }