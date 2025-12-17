import { IsEmail, IsNotEmpty, Matches, MinLength } from "class-validator"
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { TipoUsuario } from "../enums/tipo-usuario.enum";
import { Apolice } from "../../apolices/entities/apolices.entity";

@Entity({ name: "tb_usuarios" })    
export class Usuario {

    @PrimaryGeneratedColumn()
    id: number

    @IsNotEmpty()
    @Column({ length: 255, nullable: false })
    nome: string

    @IsNotEmpty()
    @Matches(/^\+[1-9]\d{1,14}$/, {
    message: 'Telefone deve estar no formato internacional E.164 (ex: +5511999999999)'
     })
    @Column({ length: 16, nullable: true})
    telefone: string;

    @IsEmail()
    @IsNotEmpty()
    @Column({ length: 255, nullable: false, unique: true })
    usuario: string

    @MinLength(8)
    @IsNotEmpty()
    @Column({ length: 255, nullable: false })
    senha: string

    @Column({ length: 5000, nullable: true })
    foto: string

    @Column({
    type: 'enum',
    enum: TipoUsuario,
    default: TipoUsuario.CLIENTE
    })
    tipo: TipoUsuario;

    @OneToMany(() => Apolice, (apolice) => apolice.usuario)
    apolices: Apolice[];

}