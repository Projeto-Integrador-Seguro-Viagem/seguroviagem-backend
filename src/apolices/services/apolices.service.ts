import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Apolice } from '../entities/apolices.entity';

@Injectable()
export class ApoliceService {
  constructor(
    @InjectRepository(Apolice)
    private apoliceRepository: Repository<Apolice>,
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
  async create(data: Apolice): Promise<Apolice> {
    const novaApolice = this.apoliceRepository.create(data);
    return await this.apoliceRepository.save(novaApolice);
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