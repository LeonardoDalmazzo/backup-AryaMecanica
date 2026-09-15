# Diretrizes do projeto

## Engenharia e interface

- Aplicar clean code, SOLID e componentes pequenos e reutilizáveis.
- Usar HTML semântico, CSS puro e JavaScript vanilla, sem frameworks de frontend.
- Usar exclusivamente FontAwesome ao adicionar ou substituir ícones.
- Desenvolver mobile-first, com responsividade para smartphones, tablets, desktops e TVs.
- Centralizar cores, espaçamentos, bordas, tipografia e medidas de layout em variáveis CSS reutilizáveis.
- Preservar acessibilidade, navegação por teclado, SEO e carregamento rápido.
- Quando um novo backend ou banco for necessário, usar C#/.NET com PostgreSQL no Supabase ou SQLite local.

## Git Flow

- Hierarquia: `main` → `develop` → `feature/*` ou `fix/*`.
- `main` representa produção e recebe somente releases estáveis com Semantic Versioning 2.0.0 (`MAJOR.MINOR.PATCH`).
- Criar novas branches de trabalho a partir da `develop` atualizada, com nomes em kebab-case sem acentos.
- Desenvolver e commitar em `feature/*` ou `fix/*`; integrar o trabalho concluído à `develop` com `git merge --no-ff`.
- Não desenvolver diretamente em `main` ou `develop`.
- Usar commits granulares por intenção, no padrão Conventional Commits, com resumo e descrição em pt-BR.
- Revisar `git status`, o diff completo e o diff staged; selecionar arquivos ou hunks explicitamente, preservando alterações existentes do usuário.
- Executar `git diff --check` e as validações proporcionais à mudança antes dos commits. Informar as verificações não executadas.
- Mensagem de integração: `chore(develop): integra <nome-da-branch>`, com descrição das mudanças.
- Quando solicitado, enviar a branch de trabalho e a `develop` ao remoto com tracking (`git push -u origin <branch> develop`).
- Push de desenvolvimento não é uma release. Publicar em `main` e criar tags somente no escopo de uma release solicitada pelo usuário.
- Não usar force push nem reescrever histórico publicado sem instrução explícita.

## Releases e deploy

- Usar `PATCH` para correções compatíveis, `MINOR` para funcionalidades compatíveis e `MAJOR` para mudanças incompatíveis.
- Validar a `develop`, atualizar `CHANGELOG.md` e seguir [deploy/README.md](deploy/README.md) para gerar o pacote versionado.
- Integrar a versão validada em `main`, usar `chore(release): publica vX.Y.Z` e criar a tag anotada `vX.Y.Z`.
- Manter a mesma versão no pacote, na tag, no changelog e nas referências de cache dos assets alterados.
- Integrar eventuais ajustes da release de volta à `develop` para manter as bases sincronizadas.
