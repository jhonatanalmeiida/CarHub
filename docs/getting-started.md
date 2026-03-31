# Guia de Uso

## Pre-requisitos

- Node.js 20+
- npm 10+
- Docker Desktop ativo para o fluxo com containers

## Fluxo recomendado local

1. Instale dependencias:

```bash
npm install
```

2. Inicie o banco:

```bash
npm run db:start
```

3. Crie o schema e carregue os mocks:

```bash
npm run db:prepare
```

4. Rode a aplicacao em modo local:

```bash
npm run start:local
```

## Fluxo completo com Docker

1. Instale as dependencias:

```bash
npm install
```

2. Abra o Docker Desktop.

3. Rode:

```bash
npm start
```

4. Acesse:

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:3000`
- Swagger: `http://localhost:3000/api-docs`

## Enderecos locais

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:3000`
- Swagger: `http://localhost:3000/api-docs`

## Credenciais mockadas

### Administrador

- Email: `admin@carhub.cloud`
- Senha: `Admin@123`

### Usuario comum

- Email: `user@carhub.cloud`
- Senha: `User@123`

## Dados incluidos no seed

O banco mockado ja sobe com:

- 10 marcas
- 10 modelos
- 20 veiculos com combinacoes diferentes de preco, cor, combustivel, potencia e carroceria
- 1 usuario admin
- 1 usuario comum
- favoritos pre-carregados no usuario comum
- 1 comparacao pre-carregada no usuario comum

## Roteiro rapido de teste

1. Entrar com `user@carhub.cloud`
2. Acessar o catalogo e testar busca, filtros e comparacao
3. Abrir favoritos e validar a shortlist pre-semeada
4. Ir para comparacao e revisar o comparativo inicial
5. Entrar com `admin@carhub.cloud`
6. Validar dashboard e CRUD de marcas, modelos e veiculos

## Scripts uteis

- `npm run db:start`: sobe apenas o PostgreSQL
- `npm run db:prepare`: aplica o schema Prisma e popula os mocks
- `npm run start:local`: roda frontend e backend localmente
- `npm start`: sobe o stack via Docker Compose
- `npm run test`: roda frontend + backend
- `npm run build`: build completo do monorepo

## Observacoes

- Se `npm run db:start` reclamar do Docker daemon, abra o Docker Desktop e rode o comando novamente.
- O arquivo `backend/.env` e `frontend/.env` sao criados automaticamente por `npm run setup:env`.
