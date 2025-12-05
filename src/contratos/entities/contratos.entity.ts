import { IsNotEmpty } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'tb_contratos' })
export class Contrato {
  @PrimaryGeneratedColumn()
  id: number;

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
}

