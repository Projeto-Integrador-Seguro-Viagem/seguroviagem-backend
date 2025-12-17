import { IsNotEmpty } from 'class-validator';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Usuario } from '../../usuarios/entities/usuarios.entity';
import { Tipo } from '../../tipo/entities/tipo.entity';

@Entity({ name: 'tb_apolices' })
export class Apolice {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @Column({ length: 100, nullable: false })
  nome: string;

  @IsNotEmpty()
  @Column({ length: 100, nullable: false })
  destino: string;

  @IsNotEmpty()
  @Column({ type: 'date' })
  data_inicio_viagem: Date;

  @IsNotEmpty()
  @Column({ type: 'date' })
  data_fim_viagem: Date;

  @IsNotEmpty()
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  valor_plano: number;

  @IsNotEmpty()
  @Column({ length: 100, nullable: false })
  cobertura_escolhida: string;

  @ManyToOne(() => Usuario, (usuario) => usuario.apolices, {
    onDelete: 'CASCADE',
  })
  usuario: Usuario;

  @ManyToOne(() => Tipo, (tipo) => tipo.apolice, {
    onDelete: 'CASCADE',
  })
  tipo: Tipo;

}
