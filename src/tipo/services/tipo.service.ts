import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { Tipo } from '../entities/tipo.entity';

@Injectable()
export class TipoService {
    constructor(
        @InjectRepository(Tipo)
        private readonly tipoRepository: Repository<Tipo>,
    ) { }

    create(createTipo: Partial<Tipo>) {
        return this.tipoRepository.save(createTipo);
    }

    async findAll(): Promise<Tipo[]> {
        return await this.tipoRepository.find();
    }

async findByNome(nome: string): Promise<Tipo[]> {
  return await this.tipoRepository.find({
    where: {
      nome: ILike(`%${nome}%`), 
    },
  });
}

    async findById(id: number): Promise<Tipo> {
        const tipo = await this.tipoRepository.findOne({
            where: {
                id
            }
        });
        if (!tipo)
            throw new HttpException('Usuário não encontrado!', HttpStatus.NOT_FOUND);
        return tipo;
    }


  async update(id: number, updateTipo: Partial<Tipo>): Promise<Tipo> {
    await this.tipoRepository.update(id, updateTipo);
    return this.findById(id);
  }

    delete(id: number) {
        return this.tipoRepository.delete(id);
    }

    
  calcularSeguro(valorBase: number, tipo: Tipo) {
  const nomePlano = (tipo?.nome || '').toUpperCase();
  const isEuaCanada =
    nomePlano.includes('EUA') ||
    nomePlano.includes('ESTADOS UNIDOS') ||
    nomePlano.includes('USA') ||
    nomePlano.includes('CANADÁ') ||
    nomePlano.includes('CANADA');

  const fator = isEuaCanada ? 1.2 : 1.0;
  const total = Number((valorBase * fator).toFixed(2));

  return {
    base: Number(valorBase.toFixed(2)),
    fator,
    total,
    motivo: isEuaCanada ? 'Acréscimo de 20% para EUA/Canadá' : 'Sem acréscimo',
    tipoNome: tipo?.nome || null,
  };
}

}
