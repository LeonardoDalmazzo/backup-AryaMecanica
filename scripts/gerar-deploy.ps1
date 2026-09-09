[CmdletBinding()]
param(
    [Parameter(Mandatory = $true)]
    [ValidatePattern('^\d+\.\d+\.\d+$')]
    [string]$Versao
)

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

$raizProjeto = Split-Path -Parent $PSScriptRoot
$pastaDeploy = Join-Path $raizProjeto 'deploy'
$nomePacote = "aryamecanica-site-hostgator-v$Versao.zip"
$destinoPacote = Join-Path $pastaDeploy $nomePacote
$destinoTemporario = Join-Path $pastaDeploy ".tmp-$nomePacote"

$itensPublicacao = @(
    'index.html'
    'style.css'
    'script.js'
    'aryamecanica files'
)

$entradasObrigatorias = @(
    'index.html'
    'style.css'
    'script.js'
    'aryamecanica files/REDLOGO (1).png'
    'aryamecanica files/backarya.mp4'
    'aryamecanica files/capar.png'
    'aryamecanica files/faviconam.png'
)

foreach ($item in $itensPublicacao) {
    $caminhoItem = Join-Path $raizProjeto $item

    if (-not (Test-Path -LiteralPath $caminhoItem)) {
        throw "Item obrigatorio do deploy nao encontrado: $item"
    }
}

if (-not (Test-Path -LiteralPath $pastaDeploy)) {
    New-Item -ItemType Directory -Path $pastaDeploy | Out-Null
}

if (Test-Path -LiteralPath $destinoPacote) {
    throw "Pacote ja existe e nao sera sobrescrito: $destinoPacote"
}

if (Test-Path -LiteralPath $destinoTemporario) {
    throw "Pacote temporario pendente. Revise e remova antes de tentar novamente: $destinoTemporario"
}

try {
    Push-Location $raizProjeto

    try {
        Compress-Archive -Path $itensPublicacao -DestinationPath $destinoTemporario
    }
    finally {
        Pop-Location
    }

    Add-Type -AssemblyName System.IO.Compression.FileSystem
    $arquivoZip = [System.IO.Compression.ZipFile]::OpenRead($destinoTemporario)

    try {
        $nomesEntradas = New-Object 'System.Collections.Generic.HashSet[string]' ([System.StringComparer]::OrdinalIgnoreCase)

        foreach ($entrada in $arquivoZip.Entries) {
            [void]$nomesEntradas.Add($entrada.FullName.Replace('\', '/'))
        }
    }
    finally {
        $arquivoZip.Dispose()
    }

    $entradasAusentes = @(
        $entradasObrigatorias | Where-Object { -not $nomesEntradas.Contains($_) }
    )

    if ($entradasAusentes.Count -gt 0) {
        throw "Pacote incompleto. Entradas ausentes: $($entradasAusentes -join ', ')"
    }

    Move-Item -LiteralPath $destinoTemporario -Destination $destinoPacote
}
catch {
    if (Test-Path -LiteralPath $destinoTemporario) {
        Remove-Item -LiteralPath $destinoTemporario -Force
    }

    throw
}

Write-Output "Pacote criado: $destinoPacote"
