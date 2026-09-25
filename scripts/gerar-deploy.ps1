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
    'robots.txt'
    'sitemap.xml'
    'marcas.html'
    'marcas.css'
    'marcas.js'
    'style.css'
    'script.js'
    'enviar-contato.php'
    '.htaccess'
    'aryamecanica files'
)

$entradasObrigatorias = @(
    'index.html'
    'robots.txt'
    'sitemap.xml'
    'marcas.html'
    'marcas.css'
    'marcas.js'
    'style.css'
    'script.js'
    'enviar-contato.php'
    '.htaccess'
    'aryamecanica files/REDLOGO (1).png'
    'aryamecanica files/backarya.mp4'
    'aryamecanica files/capar-820.jpg'
    'aryamecanica files/capar-1640.jpg'
    'aryamecanica files/faviconam.png'
    'aryamecanica files/metal-960.jpg'
    'aryamecanica files/metal-1920.jpg'
    'aryamecanica files/Ar1.jpg'
    'aryamecanica files/Ar2-1.jpg'
    'aryamecanica files/Ar2-0011.jpg'
    'aryamecanica files/Ar2-0022.jpg'
    'aryamecanica files/Ar3.jpg'
    'aryamecanica files/Ar4.jpg'
    'aryamecanica files/pngwing.com (13).png'
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
