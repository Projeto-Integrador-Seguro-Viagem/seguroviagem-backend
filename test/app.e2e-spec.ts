import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { TypeOrmModule } from '@nestjs/typeorm';

describe('Testes dos Módulos Usuario e Auth (e2e)', () => {

  let token: any;
  let usuarioId: any;
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [__dirname + "./../src/**/entities/*.entity.ts"],
          synchronize: true,
          dropSchema: true,
        }),
        AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  })

  it("01 - Deve Cadastrar um novo Usuário", async () => {
    const resposta = await request(app.getHttpServer())
      .post('/usuarios/cadastrar')
      .send({
        nome: 'Root',
        usuario: 'root@root.com',
        senha: 'rootroot',
        foto: '-',
        telefone: "+5511999999999",
      })
      .expect(201)

    usuarioId = resposta.body.id;
  });

  it("02 - Não Deve Cadastrar um Usuário Duplicado", async () => {
    await request(app.getHttpServer())
      .post('/usuarios/cadastrar')
      .send({
        nome: 'Root',
        usuario: 'root@root.com',
        senha: 'rootroot',
        foto: '-',
        telefone: "+5511999999999",
      })
      .expect(400)
  });

  it("03 - Deve Autenticar o Usuário (Login)", async () => {
    // CORREÇÃO: Verifique se sua rota de login é '/auth/login' ou '/usuarios/logar'
    // Como não está no UsuarioController, assumi que está em um AuthController
    const resposta = await request(app.getHttpServer())
    .post("/auth/login") 
    .send({
      usuario: 'root@root.com',
      senha: 'rootroot',
    })
    .expect(200)

    token = resposta.body.token;
  })

  it("04 - Deve Listar todos os Usuários", async () => {
    return request(app.getHttpServer())
    .get('/usuarios') // CORREÇÃO: Removido o '/all' que não existe no controller
    .set('Authorization', `${token}`)
    .send({})
    .expect(200)
  })

  it("05 - Deve Atualizar um Usuário", async () => {
    return request(app.getHttpServer())
    .put(`/usuarios/${usuarioId}`) // CORREÇÃO: Adicionado o ID na URL
    .set('Authorization', `${token}`)
    .send({
      id: usuarioId,
      nome: 'Root Atualizado',
      usuario: 'root@root.com',
      senha: 'rootroot',
      foto: '-',
      telefone: "+5511999999999",
    })
    .expect(200)
    .then( resposta => {
      expect("Root Atualizado").toEqual(resposta.body.nome);
    })
  })

});