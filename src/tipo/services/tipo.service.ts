import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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


    findByNome(nome: string) {
        return this.tipoRepository.find({ 
            where: { nome: nome }
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

    
    calcularSeguro(valorBase: number, tipo: Tipo): number {
  const nomePlano = tipo.nome.toUpperCase();

  if (nomePlano.includes('ESTADOS UNIDOS') || nomePlano.includes('CANADA')) {
    return Number((valorBase * 1.2).toFixed(2));
  }

  return Number(valorBase.toFixed(2));
    }







    // calculateInsurancePrice(startDate: string, endDate: string, destination: string, dailyPrice: number) {
    //     const start = new Date(startDate);
    //     const end = new Date(endDate);
    //     const diffTime = Math.abs(end.getTime() - start.getTime());
    //     const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    //     let total = diffDays * dailyPrice;

    //     const northAmerica = ['EUA', 'CANADA', 'USA', 'CANADÁ', 'INTERNACIONAL', 'NACIONAL']; // Added extra checks strictly speaking user said "EUA/Canada" for logic but "nome" is Int/Nac/EUA. Logic remains same for Price but maybe strictly linked to TIPO nome?
    //     // User said: "Se o destino for EUA ou Canadá, aplicar um acréscimo de 20%"
    //     // User ALSO said: "nome (internacional / nacional / EUA)" for Tipo.
    //     // I will keep the destination logic as string input for the calculation service as before.

    //     const increaseDestinations = ['EUA', 'CANADA', 'USA', 'CANADÁ'];
    //     if (increaseDestinations.includes(destination.toUpperCase())) {
    //         total *= 1.2;
    //     }

    //     return {
    //         days: diffDays,
    //         basePrice: diffDays * dailyPrice,
    //         totalPrice: total,
    //         destinationModifier: increaseDestinations.includes(destination.toUpperCase()) ? '20% increase' : 'None'
    //     };
    // }
}
