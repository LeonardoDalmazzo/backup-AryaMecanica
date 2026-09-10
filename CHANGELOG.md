# Historico de versoes

Todas as mudancas relevantes deste projeto sao registradas neste arquivo. O projeto usa SemVer, e os commits de cada versao ficam agrupados por tipo de Conventional Commit, do mais recente para o mais antigo.

## Nao publicado

- Nenhuma mudanca versionada.

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
