<?php
// generate_link.php

$email = $_POST['email'] ?? '';
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    die("Invalid email.");
}

$token = bin2hex(random_bytes(16));
$filepath = "DownloadDoc/securefile.pdf"; // Path to your file
$custom_filename = "Your_SCO_" . preg_replace("/[^a-zA-Z0-9]/", "_", $email) . ".pdf";

// Save the token and metadata
$entry = [
    'email' => $email,
    'file' => $filepath,
    'custom_name' => $custom_filename,
    'used' => false
];

$links = file_exists("links.json") ? json_decode(file_get_contents("links.json"), true) : [];
$links[$token] = $entry;
file_put_contents("links.json", json_encode($links, JSON_PRETTY_PRINT));

$download_link = "http://" . $_SERVER['HTTP_HOST'] . dirname($_SERVER['PHP_SELF']) . "/download.php?token=" . $token;

echo "<p>Thank you! Your download link is:</p>";
echo "<a href='$download_link'>$download_link</a>";
?>
