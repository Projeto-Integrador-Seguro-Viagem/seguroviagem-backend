import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, ILike, Repository } from 'typeorm';
import { Apolice } from '../entities/apolices.entity';
import { TipoService } from '../../tipo/services/tipo.service';
import { Tipo } from '../../tipo/entities/tipo.entity';

@Injectable()
export class ApoliceService {
constructor(
  @InjectRepository(Apolice)
  private readonly apoliceRepository: Repository<Apolice>,

  @InjectRepository(Tipo)
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
      throw new NotFoundException(`Apólice não encontrada! ${id}`);
    }
    return apolice;
  }

  //Encontrar por destino
async findByDestino(destino: string): Promise<Apolice[]> {
  return await this.apoliceRepository.find({
    where: {
      destino: ILike(`%${destino}%`), 
    },
  });
}

  //CRUD
  //Criar

async create(apolice: Apolice): Promise<any> {
  const tipo = await this.tipoRepository.findOne({ where: { id: apolice.tipo.id } });
  if (!tipo) throw new Error('Tipo não encontrado');

  const resultado = this.tipoService.calcularSeguro(apolice.valor_plano, tipo);

  apolice.tipo = tipo;
  const saved = await this.apoliceRepository.save(apolice);

  // retorna o objeto salvo + extras do cálculo
  return {
    ...saved,
    valor_calculado: resultado.total,
    fator_aplicado: resultado.fator,
    motivo_calculo: resultado.motivo,
  };
}

  //Atualizar
async update(id: number, data: Partial<Apolice>): Promise<any> {
  const apolice = await this.findById(id);

  // merge dos dados
  const apoliceAtualizada = {
    ...apolice,
    ...data,
  };

  // garante que o tipo esteja carregado
  const tipo = await this.tipoRepository.findOne({ where: { id: apoliceAtualizada.tipo.id } });
  if (!tipo) throw new Error('Tipo não encontrado');

  // aplica a regra de negócio novamente
  const resultado = this.tipoService.calcularSeguro(apoliceAtualizada.valor_plano, tipo);

  apoliceAtualizada.tipo = tipo;
  const saved = await this.apoliceRepository.save(apoliceAtualizada);

  // retorna o objeto salvo + extras do cálculo
  return {
    ...saved,
    valor_calculado: resultado.total,
    fator_aplicado: resultado.fator,
    motivo_calculo: resultado.motivo,
  };
}

  //Deletar
  async delete(id: number): Promise<DeleteResult> {
    return await this.apoliceRepository.delete(id);
  }
}