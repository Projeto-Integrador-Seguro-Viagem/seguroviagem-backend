import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
<<<<<<< HEAD
import { Contrato } from '../../contratos/entities/contratos.entity';
import { Usuario } from '../../usuarios/entities/usuarios.entity';
=======
import { Usuario } from '../../usuarios/entities/usuarios.entity';
import { Apolice } from '../../apolices/entities/apolices.entity';
>>>>>>> 12bbb22fd7dd349677e8814b2102fb699b1834ee

@Entity({ name: 'tb_tipo' })
export class Tipo {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 255 })
    nome: string; // internacional / nacional / EUA

    @Column({ type: 'text' })
    descricao: string;

    @ManyToOne(() => Usuario, (usuario) => usuario.tipo, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'usuario_id' })
    usuario: Usuario;

    @ManyToOne(() => Apolice, (apolice) => apolice.tipo, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'contrato_id' })
    contrato: Apolice;
  apolice: any;
}
