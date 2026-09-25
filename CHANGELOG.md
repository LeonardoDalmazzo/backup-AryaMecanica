# Historico de versoes

Todas as mudancas relevantes deste projeto sao registradas neste arquivo. O projeto usa SemVer, e os commits de cada versao ficam agrupados por tipo de Conventional Commit, do mais recente para o mais antigo.

## Nao publicado

- Nenhuma mudanca versionada.

## v1.6.0 - 2026-09-25

### Metadados

- Estado: pacote preparado para deploy; release em `main` ainda nao publicada.
- Artefato: `deploy/aryamecanica-site-hostgator-v1.6.0.zip`.

### Funcionalidades

- Substitui listas dos cards por botoes que abrem lightboxes de modelos para as oito marcas.
- Aplica cores por marca no hover e foco dos atalhos, botoes de modelos e links de manutencao.
- Permite fechar os lightboxes por botao, Escape ou clique fora, com retorno do foco ao botao de origem.

### Conteudo

- Remove Harley-Davidson e Royal Enfield da pagina de marcas.
- Atualiza textos do destaque, legenda, revisao, diagnostico e perguntas frequentes.
- Esclarece que o leva e traz e uma indicacao de servico terceirizado sem vinculo com a oficina.

### Empacotamento

- Inclui `marcas.js` na geracao e validacao do pacote, com CSS e JavaScript da pagina referenciados como `v1.6.0`.

## v1.5.0 - 2026-09-25

### Metadados

- Estado: pacote preparado para deploy; release em `main` ainda nao publicada.
- Artefato: `deploy/aryamecanica-site-hostgator-v1.5.0.zip`.

### Funcionalidades

- Adiciona pagina de marcas com servicos, perguntas frequentes, localizacao e contatos pelo WhatsApp.
- Inclui links para Marcas na navegacao principal, mobile e rodape.
- Adiciona sitemap das paginas publicas e robots.txt com permissao de rastreamento.

### Correcoes

- Aplica a cor de destaque no hover e foco dos links do rodape.

### Empacotamento

- Inclui pagina de marcas, seus estilos, sitemap e robots.txt na geracao e validacao do pacote.
- Atualiza as referencias de cache dos estilos para `v1.5.0` e documenta o envio do sitemap ao Search Console.

## v1.4.0 - 2026-09-19

### Metadados

- Estado: pacote preparado para deploy; release em `main` ainda nao publicada.
- Artefato: `deploy/aryamecanica-site-hostgator-v1.4.0.zip`.

### Funcionalidades

- Adiciona uma faixa de brilho da esquerda para a direita nos botoes sociais da home e do rodape, Contato no header, Leva e Traz, WhatsApp, Enviar mensagem e Voltar ao topo.
- Mantem o hover laranja do rodape e aplica o mesmo hover aos botoes sociais da home.
- Ativa o brilho no hover e no foco por teclado, respeitando a preferencia por movimento reduzido e o estado desabilitado do formulario.
- Preserva o hover original de Home, Servicos, Nosso trabalho e Quem somos.

### Empacotamento

- Atualiza a referencia de cache do CSS para `v1.4.0` e gera o pacote versionado para a HostGator.

## v1.3.0 - 2026-09-15

### Metadados

- Tag: `v1.3.0`.
- Artefato: `deploy/aryamecanica-site-hostgator-v1.3.0.zip`.

### Funcionalidades

- Moderniza o cabecalho com a marca da oficina, destaque para contato e estado visual durante a rolagem.
- Reorganiza o menu responsivo com um unico botao de abertura e fechamento, ciclo de foco e suporte a movimento reduzido.
- Adiciona um rodape responsivo com marca, navegacao, redes sociais e direitos reservados atualizados.

### Correcoes

- Direciona os links sociais do menu, destaque e rodape aos perfis da oficina no YouTube, Facebook e Instagram.
- Atualiza a versao dos arquivos CSS e JavaScript para invalidar o cache da publicacao anterior.

### Documentacao

- Registra em `AGENTS.md` os padroes de engenharia, commits granulares, Git Flow e releases semanticas.

## v1.2.0 - 2026-09-10

### Metadados

- Tag: `v1.2.0`.
- Artefato: `deploy/aryamecanica-site-hostgator-v1.2.0.zip`.

### Interface

- Moderniza a area de contato com cartao de informacoes, icones e hierarquia visual mais clara.
- Reorganiza o formulario em uma coluna no mobile, pares de campos no tablet e duas areas equilibradas em telas maiores.
- Adiciona um botao laranja do WhatsApp ao cartao de contato e remove o atalho duplicado da secao institucional.
- Substitui o atalho flutuante do WhatsApp por um botao de retorno ao topo.

### Experiencia

- Restaura o efeito parallax da faixa de video com suporte a preferencia de movimento reduzido.

## v1.1.2 - 2026-09-09

### Metadados

- Tag: `v1.1.2`.
- Artefato: `deploy/aryamecanica-site-hostgator-v1.1.2.zip`.

### Correcoes

- Aumenta o contraste e o peso visual dos links do menu principal.
- Atualiza a versao dos arquivos CSS e JavaScript para invalidar o cache anterior.

## v1.1.1 - 2026-09-09

### Metadados

- Tag: `v1.1.1`.
- Artefato: `deploy/aryamecanica-site-hostgator-v1.1.1.zip`.

### Correcoes

- Preserva a proporcao original das imagens quando o layout reduz sua largura em telas menores.
- Atualiza a versao dos arquivos CSS e JavaScript para invalidar o cache da publicacao anterior.

## v1.1.0 - 2026-09-09

### Metadados

- Tag: `v1.1.0`.
- Artefato: `deploy/aryamecanica-site-hostgator-v1.1.0.zip`.

### Funcionalidades

- Envia o formulario de contato pelo servidor da hospedagem para `aryamecanica@gmail.com`.

### Correcoes

- Substitui o envio inseguro por `mailto:` por uma requisicao HTTPS ao proprio dominio.
- Adiciona validacao no navegador e no servidor, feedback de envio, limite de frequencia e campo antispam.

### Desempenho

- Otimiza e dimensiona as imagens para os tamanhos usados na pagina.
- Adia o carregamento da galeria e do video ate que o visitante se aproxime dessas secoes.
- Habilita cache, compressao e preload responsivo da imagem principal.

### Seguranca

- Forca HTTPS e adiciona cabecalhos de seguranca no Apache.

## v1.0.0 - 2026-09-09

### Metadados

- Tag sugerida: `v1.0.0`.
- Artefato: `deploy/aryamecanica-site-hostgator-v1.0.0.zip`.

### Manutencao

- Remove imagens sem uso do site.
- Adiciona o fluxo de pacotes de deploy versionados.
