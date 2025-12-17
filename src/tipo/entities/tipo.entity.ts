import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Apolice } from '../../apolices/entities/apolices.entity';

@Entity({ name: 'tb_tipo' })
export class Tipo {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 255 })
    nome: string; // internacional / nacional / EUA

    @Column({ type: 'text' })
    descricao: string;


    @OneToMany(() => Apolice, (apolice) => apolice.tipo)
    apolices: Apolice[];
}
