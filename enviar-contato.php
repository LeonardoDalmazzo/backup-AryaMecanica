<?php

declare(strict_types=1);

const EMAIL_DESTINO = 'aryamecanica@gmail.com';
const LIMITE_REQUISICAO = 20000;
const INTERVALO_ENTRE_ENVIOS = 20;

function aceita_json(): bool
{
    $accept = $_SERVER['HTTP_ACCEPT'] ?? '';
    $requestedWith = $_SERVER['HTTP_X_REQUESTED_WITH'] ?? '';

    return stripos($accept, 'application/json') !== false
        || strcasecmp($requestedWith, 'XMLHttpRequest') === 0;
}

function responder(int $status, bool $sucesso, string $mensagem): void
{
    http_response_code($status);
    header('Cache-Control: no-store');
    header('X-Content-Type-Options: nosniff');

    if (aceita_json()) {
        header('Content-Type: application/json; charset=UTF-8');
        echo json_encode(
            ['success' => $sucesso, 'message' => $mensagem],
            JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES
        );
        exit;
    }

    $resultado = $sucesso ? 'sucesso' : 'erro';
    header("Location: index.html?contato={$resultado}#contato", true, 303);
    exit;
}

function campo(string $nome): string
{
    $valor = $_POST[$nome] ?? '';

    if (!is_string($valor)) {
        return '';
    }

    return trim(str_replace(["\r\n", "\r"], "\n", $valor));
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    responder(405, false, 'Metodo nao permitido.');
}

if ((int) ($_SERVER['CONTENT_LENGTH'] ?? 0) > LIMITE_REQUISICAO) {
    responder(413, false, 'Os dados enviados excedem o limite permitido.');
}

$host = strtolower(preg_replace('/:\d+$/', '', $_SERVER['HTTP_HOST'] ?? ''));
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';

if ($origin !== '') {
    $originHost = strtolower((string) parse_url($origin, PHP_URL_HOST));

    if ($originHost === '' || !hash_equals($host, $originHost)) {
        responder(403, false, 'Origem da solicitacao nao permitida.');
    }
}

if (campo('website') !== '') {
    responder(200, true, 'Mensagem enviada com sucesso. Entraremos em contato em breve.');
}

$cookieSeguro = !empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off';
session_name('arya_contact');
session_start([
    'cookie_httponly' => true,
    'cookie_samesite' => 'Lax',
    'cookie_secure' => $cookieSeguro,
    'use_strict_mode' => true,
]);

$agora = time();
$ultimoEnvio = (int) ($_SESSION['ultimo_envio'] ?? 0);

if ($ultimoEnvio > 0 && ($agora - $ultimoEnvio) < INTERVALO_ENTRE_ENVIOS) {
    responder(429, false, 'Aguarde alguns segundos antes de enviar outra mensagem.');
}

$nome = campo('nome');
$sobrenome = campo('sobrenome');
$email = campo('email');
$telefone = campo('telefone');
$mensagem = campo('mensagem');

$erros = [];

if ($nome === '' || strlen($nome) > 80) {
    $erros[] = 'Informe um nome valido.';
}

if (strlen($sobrenome) > 80) {
    $erros[] = 'O sobrenome informado e muito longo.';
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL) || strlen($email) > 254) {
    $erros[] = 'Informe um email valido.';
}

if (strlen($telefone) > 20) {
    $erros[] = 'Informe um telefone valido.';
}

if (strlen($mensagem) < 10 || strlen($mensagem) > 2000) {
    $erros[] = 'A mensagem deve ter entre 10 e 2000 caracteres.';
}

if ($erros !== []) {
    responder(422, false, implode(' ', $erros));
}

if (!preg_match('/^(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z]{2,}$/', $host)) {
    $host = 'localhost.localdomain';
}

$nomeCompleto = trim($nome . ' ' . $sobrenome);
$telefoneExibicao = $telefone !== '' ? $telefone : 'Nao informado';
$corpo = implode("\r\n", [
    'Novo contato recebido pelo site Arya Mecanica',
    '',
    "Nome: {$nomeCompleto}",
    "Email: {$email}",
    "Telefone: {$telefoneExibicao}",
    '',
    'Mensagem:',
    $mensagem,
]);

$assunto = '=?UTF-8?B?' . base64_encode('Novo contato pelo site - Arya Mecanica') . '?=';
$dominioRemetente = preg_replace('/^www\./', '', $host);
$remetente = "site@{$dominioRemetente}";
$cabecalhos = implode("\r\n", [
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
    "From: Site Arya Mecanica <{$remetente}>",
    "Reply-To: {$email}",
]);

$_SESSION['ultimo_envio'] = $agora;
$enviado = @mail(EMAIL_DESTINO, $assunto, $corpo, $cabecalhos);

if (!$enviado) {
    error_log('Falha ao enviar formulario de contato do site Arya Mecanica.');
    responder(502, false, 'Nao foi possivel enviar agora. Tente novamente ou fale pelo WhatsApp.');
}

responder(200, true, 'Mensagem enviada com sucesso. Entraremos em contato em breve.');
