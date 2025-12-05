import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Contrato } from '../entities/contratos.entity';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class ContratoService {
  constructor(
    @InjectRepository(Contrato)
    private contratoRepository: Repository<Contrato>,
  ) {}

  // Retornar todas
  async findAll(): Promise<Contrato[]> {
    return this.contratoRepository.find();
  }

  // Achar pelo id
  async findById(id: number): Promise<Contrato> {
    const contrato = await this.contratoRepository.findOne({ where: { id } });
    if (!contrato) {
      throw new NotFoundException(`Contrato nÃ£o encontrado! ${id}`);
    }
    return contrato;
  }

  //CRUD
  //Criar
  async create(data: Contrato): Promise<Contrato> {
    const novoContrato = this.contratoRepository.create(data);
    return await this.contratoRepository.save(novoContrato);
  }

  //Atualizar
  async update(id: number, data: Partial<Contrato>): Promise<Contrato> {
    const contrato = await this.findById(id);
    const contratoAtualizado = Object.assign(contrato, data);
    return await this.contratoRepository.save(contratoAtualizado);
  }

  //Deletar
  async delete(id: number): Promise<DeleteResult> {
    return await this.contratoRepository.delete(id);
  }
}