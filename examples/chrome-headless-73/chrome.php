<?php

declare(strict_types=1);

require __DIR__.'/vendor/autoload.php';

use Platformsh\ConfigReader\Config;

$config = new Config();
$credentials = $config->credentials('chrome');

$url = sprintf('%s://%s:%s/json/new/?http://php.landokitchensink.internal/',
    $credentials['scheme'], $credentials['ip'], $credentials['port']);

// Fetch json response from headless chrome
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
$output = curl_exec($ch);
curl_close($ch);

$data = json_decode($output, true);

if (!empty($data) && isset($data['id'])) {
    print "Result: OK\n";
    exit;
}

print "Result: Failed\n";
