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
.\scripts\gerar-deploy.ps1 -Versao 1.0.0
```

Se a politica local do Windows bloquear scripts, execute sem alterar a configuracao do sistema:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\gerar-deploy.ps1 -Versao 1.0.0
```

O gerador valida o formato da versao, recusa sobrescrever um pacote existente e verifica se os arquivos obrigatorios estao presentes no ZIP. Use uma versao nova para cada publicacao.

Os ZIPs desta pasta sao rastreados pelo Git LFS para evitar que os binarios aumentem excessivamente o historico normal do repositorio.
