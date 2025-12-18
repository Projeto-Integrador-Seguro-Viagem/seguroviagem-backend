import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Apolice } from '../entities/apolices.entity';
import { TipoService } from '../../tipo/services/tipo.service';
import { Tipo } from '../../tipo/entities/tipo.entity';

@Injectable()
export class ApoliceService {
constructor(
  @InjectRepository(Apolice)
  private readonly apoliceRepository: Repository<Apolice>,
  private readonly tipoRepository: Repository<Tipo>,
  private readonly tipoService: TipoService,
) {}

  // Retornar todas
  async findAll(): Promise<Apolice[]> {
    return this.apoliceRepository.find();
  }

  // Achar pelo id
  async findById(id: number): Promise<Apolice> {
    const apolice = await this.apoliceRepository.findOne({ where: { id } });
    if (!apolice) {
      throw new NotFoundException(`Apólice nÃo encontrada! ${id}`);
    }
    return apolice;
  }

  //Encontrar por destino
  async findByDestino(destino: string): Promise<Apolice[]> {
  return this.apoliceRepository.find({ where: { destino } });
}

  //CRUD
  //Criar

  async create(apolice: Apolice): Promise<Apolice> {
  // garante que o tipo esteja carregado
  const tipo = await this.tipoRepository.findOne({
    where: { id: apolice.tipo.id },
  });

  if (!tipo) {
    throw new Error('Tipo não encontrado');
  }

  // aplica a regra de negócio
  apolice.valor_plano = this.tipoService.calcularSeguro(
    apolice.valor_plano,
    tipo,
  );

  apolice.tipo = tipo;

  return this.apoliceRepository.save(apolice);
}


  //Atualizar
async update(id: number, data: Partial<Apolice>): Promise<Apolice> {
  const apolice = await this.findById(id);
  const apoliceAtualizada = {
    ...apolice,
    ...data,
  };

  return await this.apoliceRepository.save(apoliceAtualizada);
}

  //Deletar
  async delete(id: number): Promise<DeleteResult> {
    return await this.apoliceRepository.delete(id);
  }
}