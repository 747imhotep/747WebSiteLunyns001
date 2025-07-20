<?php
// download.php

$token = $_GET['token'] ?? '';
$links = file_exists("links.json") ? json_decode(file_get_contents("links.json"), true) : [];

if (!isset($links[$token])) {
    die("Invalid or expired download link.");
}

$entry = $links[$token];

if ($entry['used']) {
    die("This download link has already been used.");
}

// Serve the file
$filepath = $entry['file'];
$custom_name = $entry['custom_name'];

if (!file_exists($filepath)) {
    die("File not found.");
}

// Mark as used
$links[$token]['used'] = true;
file_put_contents("links.json", json_encode($links, JSON_PRETTY_PRINT));

// Force file download
header('Content-Description: File Transfer');
header('Content-Type: application/octet-stream');
header('Content-Disposition: attachment; filename="' . basename($custom_name) . '"');
header('Content-Length: ' . filesize($filepath));
readfile($filepath);
exit;
?>
