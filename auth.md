Prompt de Desenvolvimento: Guia de Implementação de Autenticação com Keycloak

Objetivo: Integrar o Keycloak como provedor de identidade (IdP) para proteger a SPA, utilizando o padrão OpenID Connect (OIDC) para autenticação e o padrão JWT para autorização nas APIs.
Fase 1: Configuração do Keycloak

    [ ] Configurar o Realm: Garantir que um realm esteja criado no Keycloak para a aplicação.

    [ ] Configurar o Cliente OIDC:

        Criar um novo cliente (ex: my-finance-app-client).

        Access Type: Public (para SPAs).

        Standard Flow Enabled: true.

        Valid Redirect URIs: Adicionar a URL de callback da aplicação Next.js (ex: http://localhost:3000/api/auth/callback/keycloak).

        Web Origins: Adicionar a URL base da aplicação (ex: http://localhost:3000) para permitir requisições CORS.

Fase 2: Integração com o Frontend (Next.js)

    [ ] Instalar next-auth: Adicionar a biblioteca next-auth ao projeto, que simplifica a integração com provedores OIDC como o Keycloak.

    npm install next-auth

    [ ] Criar a Rota da API de Autenticação: Criar o arquivo pages/api/auth/[...nextauth].js.

    [ ] Configurar o Provedor Keycloak: Dentro do arquivo [...nextauth].js, configurar o KeycloakProvider com as credenciais do cliente criado no Keycloak. Armazenar essas credenciais em variáveis de ambiente (.env).

    import NextAuth from 'next-auth';
    import KeycloakProvider from 'next-auth/providers/keycloak';

    export default NextAuth({
      providers: [
        KeycloakProvider({
          clientId: process.env.KEYCLOAK_ID,
          clientSecret: process.env.KEYCLOAK_SECRET,
          issuer: process.env.KEYCLOAK_ISSUER,
        }),
      ],
    });

    [ ] Envolver a Aplicação no SessionProvider: No arquivo _app.js, envolver o componente principal com o <SessionProvider> do next-auth para disponibilizar o estado da sessão globalmente.

    [ ] Implementar Lógica de Login/Logout:

        Criar componentes de UI (botões, links de menu) que utilizem os hooks signIn() e signOut() do next-auth.

        Usar o hook useSession() para exibir condicionalmente o conteúdo com base no status de autenticação do usuário.

Fase 3: Proteção de Rotas e Sincronização de Usuários

    [ ] Proteger Páginas no Frontend: Utilizar o hook useSession({ required: true }) ou a função getSession no getServerSideProps para proteger páginas que só podem ser acessadas por usuários autenticados.

    [ ] Proteger Endpoints da API:

        Em cada endpoint da API Next.js que requer autenticação, usar const session = await getSession({ req }); para obter a sessão.

        Se a sessão não existir, retornar um erro 401 Unauthorized.

    [ ] Sincronizar Usuário no Banco de Dados:

        Estratégia: No primeiro login bem-sucedido de um usuário via Keycloak, a aplicação deve garantir que um registro correspondente exista na tabela User do PostgreSQL.

        Implementação:

            Obter o ID único do usuário a partir do token (claim sub).

            Na API (ex: em um endpoint GET /users/me), verificar se um usuário com este userId (mapeado do sub) já existe no banco de dados (prisma.user.findUnique).

            Se não existir: Criar um novo registro User com os dados básicos do token (email, nome) e o userId do Keycloak.

            Se existir: Retornar os dados do usuário do banco.

        Isso garante que cada usuário no Keycloak tenha uma representação na base de dados da aplicação para associar a transações, orçamentos, etc.