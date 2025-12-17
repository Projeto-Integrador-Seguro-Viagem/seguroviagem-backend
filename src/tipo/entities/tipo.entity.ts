import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Contrato } from '../../contratos/entities/contratos.entity';
import { Usuario } from '../../usuarios/entities/usuarios.entity';

@Entity({ name: 'tb_tipo' })
export class Tipo {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 255 })
    nome: string; // internacional / nacional / EUA

    @Column({ type: 'text' })
    descricao: string;

    @ManyToOne(() => Usuario, (usuario) => usuario.tipos, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'usuario_id' })
    usuario: Usuario;

    @ManyToOne(() => Contrato, (contrato) => contrato.tipos, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'contrato_id' })
    contrato: Contrato;
}
