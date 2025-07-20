<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/PHPMailer.php';
require 'PHPMailer/SMTP.php';
require 'PHPMailer/Exception.php';

$email = $_POST['email'] ?? '';

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    die("Invalid email address.");
}

$mail = new PHPMailer(true);

try {
    // Server settings
    $mail->isSMTP();
    $mail->Host       = 'smtp.example.com'; // 🔁 Replace with your SMTP server
    $mail->SMTPAuth   = true;
    $mail->Username   = 'you@example.com';  // 🔁 Your SMTP username
    $mail->Password   = 'yourpassword';     // 🔁 Your SMTP password
    $mail->SMTPSecure = 'tls';              // Or 'ssl'
    $mail->Port       = 587;                // 465 for SSL

    // Recipients
    $mail->setFrom('you@example.com', 'Your Company');
    $mail->addAddress($email);

    // Attachment
    $filePath = 'DownloadDocs/DownloadTEST.txt';
    $customFileName = 'Your_SCO_Document';
    $mail->addAttachment($filePath, $customFileName);

    // Content
    $mail->isHTML(true);
    $mail->Subject = 'Your SCO Document';
    $mail->Body    = 'Hello,<br><br>Your SCO document is attached.<br><br>Thank you!';

    $mail->send();
    echo "✅ Document sent to <strong>$email</strong>";
} catch (Exception $e) {
    echo "❌ Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
}
