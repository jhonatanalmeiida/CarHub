# CarHub Cloud

CarHub Cloud e uma plataforma fullstack para catalogo automotivo com UX premium, API REST documentada, arquitetura cloud-ready e monorepo organizado para demo, evolucao e deploy em AWS.

## Estrutura

```text
.
├── frontend        # React + Vite + Tailwind + TanStack Query
├── backend         # Express + TypeScript + Prisma + PostgreSQL
├── infra           # Terraform para AWS
├── docs            # Diagramas, decisoes tecnicas e guias
└── .github         # Pipelines CI/CD
```

## Principais capacidades

- Autenticacao JWT com papeis `USER` e `ADMIN`
- Catalogo inteligente com filtros, busca, ordenacao e paginacao
- Favoritos e comparacao de veiculos
- Painel administrativo com CRUD de marcas, modelos e veiculos
- Swagger em `/api-docs`
- Docker e Docker Compose para ambiente local
- Estrutura de logs, health check e cloud observability
- Deploy desenhado para AWS com ECR, ECS Fargate, RDS, S3 e CloudFront

## Stack

### Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- TanStack Query
- Axios
- React Hook Form
- Zod
- Framer Motion
- Vitest + Testing Library

### Backend

- Node.js
- Express
- TypeScript
- Prisma ORM
- PostgreSQL
- JWT + bcrypt
- Swagger/OpenAPI
- Zod para validacao
- Jest

### Infra e DevOps

- Docker / Docker Compose
- GitHub Actions
- Terraform
- AWS ECR, ECS Fargate, RDS, S3, CloudFront, ACM, Route 53 e CloudWatch

## Como rodar localmente

### Passo a passo com Docker

1. Instale as dependencias:

```bash
npm install
```

2. Abra o Docker Desktop e espere o daemon ficar ativo.

3. Suba a aplicacao completa:

```bash
npm start
```

4. Acesse:

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:3000`
- Swagger: `http://localhost:3000/api-docs`

### Passo a passo local com banco mockado

1. Instale as dependencias:

```bash
npm install
```

2. Abra o Docker Desktop e suba apenas o PostgreSQL:

```bash
npm run db:start
```

3. Crie o schema e carregue os mocks:

```bash
npm run db:prepare
```

4. Rode frontend e backend em modo local:

```bash
npm run start:local
```

5. Acesse:

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:3000`
- Swagger: `http://localhost:3000/api-docs`

## Seeds e usuarios de demo

O seed inicial cria:

- marcas populares
- modelos relevantes do mercado
- 20 veiculos com dados tecnicos
- admin de demo: `admin@carhub.cloud`
- usuario de demo: `user@carhub.cloud`
- favoritos e comparacao pre-carregados

## Documentacao adicional

- [Guia de Uso](docs/getting-started.md)
- [Arquitetura](docs/architecture.md)
- [API](docs/api.md)
- [Deploy AWS](docs/deployment.md)
