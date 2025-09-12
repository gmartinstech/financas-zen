Prompt de Desenvolvimento: Plano de Ação para Integração com Prisma e PostgreSQL

Objetivo: Substituir a camada de persistência de dados atual da aplicação por uma implementação robusta utilizando o ORM Prisma conectado a um banco de dados PostgreSQL. Este documento serve como um guia de tarefas (TODOs) para a equipe de desenvolvimento.
Fase 1: Configuração e Definição do Schema

    [ ] Instalar Dependências: Adicionar o Prisma CLI como uma dependência de desenvolvimento e o Prisma Client como uma dependência de produção.

    npm install prisma --save-dev
    npm install @prisma/client

    [ ] Inicializar o Prisma: Executar o comando npx prisma init para criar a estrutura de diretórios do Prisma e o arquivo de schema (prisma/schema.prisma), configurando o provider para postgresql.

    [ ] Configurar Variáveis de Ambiente: Adicionar a DATABASE_URL do PostgreSQL ao arquivo .env, garantindo que o Prisma possa se conectar ao banco de dados.

    [ ] Traduzir Diagrama de Classes para o Schema Prisma: Mapear todas as entidades, enums e relacionamentos do diagrama 00_domain_classes.puml para o arquivo prisma/schema.prisma.

        Modelos Principais: User, Account, Transaction, Category, Budget, Document, etc.

        Tipos e Atributos: Usar os tipos do Prisma (String, DateTime, Decimal, Boolean, Json) para corresponder aos tipos do diagrama. Utilizar @id, @default(uuid()), @unique e @map conforme necessário.

        Relacionamentos: Definir corretamente as relações one-to-many (ex: User -> Account) e many-to-one (ex: Transaction -> Category).

        Enums: Declarar todos os enums (TransactionType, CategoryKind, ExpenseStatus, etc.) diretamente no schema.

Fase 2: Migração e Geração do Client

    [ ] Criar a Primeira Migração: Após definir o schema, executar npx prisma migrate dev --name init para gerar o arquivo de migração SQL e aplicá-lo ao banco de dados, criando toda a estrutura de tabelas.

    [ ] Gerar o Prisma Client: Executar npx prisma generate para gerar um cliente de banco de dados totalmente tipado com base no schema definido. Este cliente será o ponto de acesso para todas as operações de banco de dados.

Fase 3: Refatoração da Camada de Dados da Aplicação

    [ ] Instanciar o Prisma Client: Criar uma instância singleton do Prisma Client para ser reutilizada em toda a aplicação.

    [ ] Refatorar Endpoints da API: Atualizar a lógica de todos os endpoints da API para usar o Prisma Client em vez de qualquer acesso a dados mockado ou anterior.

        Exemplo (Criar Categoria): O endpoint POST /categories deve agora usar prisma.category.create({ data: ... }).

        Exemplo (Listar Transações): O endpoint GET /transactions deve usar prisma.transaction.findMany({ where: ..., include: ..., orderBy: ..., take: ..., skip: ... }) para suportar filtros, relacionamentos e paginação.

        Checklist de Endpoints a Refatorar:

            GET /users/me/preferences

            PUT /users/me/preferences

            CRUD de Category (/categories)

            CRUD de Transaction (/transactions)

            CRUD de Budget (/budgets)

            Endpoints de Document e Interpretation.

    [ ] (Opcional) Criar um Script de Seed: Desenvolver um script em prisma/seed.ts para popular o banco de dados com dados de teste (usuários, categorias padrão, etc.), facilitando o desenvolvimento e os testes.