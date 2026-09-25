# Pacotes de deploy

Esta pasta armazena os pacotes versionados para publicacao do site Arya Mecanica na HostGator.

## Versionamento

Cada release usa versionamento semantico no formato `vMAJOR.MINOR.PATCH`:

- `PATCH`: correcoes compativeis, como `v1.0.1`.
- `MINOR`: novas funcionalidades compativeis, como `v1.1.0`.
- `MAJOR`: mudancas incompativeis ou um novo ciclo principal, como `v2.0.0`.

A mesma versao deve ser usada nos tres pontos da release:

```text
Commit final: chore(release): publica vX.Y.Z
Tag anotada: vX.Y.Z
Pacote: deploy/aryamecanica-site-hostgator-vX.Y.Z.zip
```

As mudancas da versao devem ser registradas em `CHANGELOG.md` antes da publicacao.

## Gerar um pacote

Na raiz do projeto, execute o script informando a versao sem o prefixo `v`:

```powershell
.\scripts\gerar-deploy.ps1 -Versao 1.4.0
```

Se a politica local do Windows bloquear scripts, execute sem alterar a configuracao do sistema:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\gerar-deploy.ps1 -Versao 1.4.0
```

O gerador valida o formato da versao, recusa sobrescrever um pacote existente e verifica se os arquivos obrigatorios estao presentes no ZIP. Use uma versao nova para cada publicacao.

Os ZIPs desta pasta sao rastreados pelo Git LFS para evitar que os binarios aumentem excessivamente o historico normal do repositorio.

## Sitemap e buscadores

O pacote inclui `robots.txt` e `sitemap.xml`, que devem ficar na raiz publica do dominio, junto de `index.html`. Publique tambem `marcas.html`, pois essa pagina esta listada no sitemap.

Apos publicar, confira se `https://aryamecanica.com/robots.txt` e `https://aryamecanica.com/sitemap.xml` abrem normalmente. No Google Search Console, envie `https://aryamecanica.com/sitemap.xml` na secao Sitemaps.

Ao adicionar ou remover paginas publicas, atualize o sitemap. Use URLs completas em HTTPS, sem ancoras (`#`) e sem incluir endpoints do formulario. O `robots.txt` permite o rastreamento do site e informa o endereco do sitemap; ele nao impede spam no formulario.

## Requisitos da hospedagem

- Confirme que o certificado SSL da HostGator esta ativo antes de publicar. O `.htaccess` redireciona todo acesso para HTTPS.
- Use PHP 8.1 ou mais recente no dominio.
- Crie no cPanel uma conta como `site@seu-dominio` para melhorar a autenticidade do remetente usado pelo formulario.
- O formulario envia as mensagens para `aryamecanica@gmail.com` por meio da funcao de email do PHP na propria hospedagem.

Depois de cada publicacao, abra o site em HTTPS, envie uma mensagem real pelo formulario e confirme o recebimento, inclusive na pasta de spam. Esse teste final depende do servico de email da hospedagem e nao pode ser reproduzido apenas no ambiente local.
