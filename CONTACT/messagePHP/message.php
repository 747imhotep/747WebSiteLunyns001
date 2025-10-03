<!-- ✅ MESSAGE PHP -->

<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Create upload directory if it doesn't exist
    $uploadDir = __DIR__ . "/uploads/";
    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0755, true);
    }

    // Allowed file types
    $allowedTypes = ['pdf', 'doc', 'docx', 'jpg', 'jpeg', 'png'];
    $maxFileSize = 5 * 1024 * 1024; // 5MB

    $file = $_FILES['attachment'];
    $fileName = basename($file['name']);
    $fileTmp = $file['tmp_name'];
    $fileSize = $file['size'];
    $fileExt = strtolower(pathinfo($fileName, PATHINFO_EXTENSION));
    $targetFile = $uploadDir . uniqid("file_", true) . "." . $fileExt;

    // Validate file extension
    if (!in_array($fileExt, $allowedTypes)) {
        die("Error: Invalid file type. Allowed types: " . implode(", ", $allowedTypes));
    }

    // Validate file size
    if ($fileSize > $maxFileSize) {
        die("Error: File size exceeds the 5MB limit.");
    }

    // Extra security check — ensure it’s actually an uploaded file
    if (!is_uploaded_file($fileTmp)) {
        die("Error: Potential file upload attack.");
    }

    // Move uploaded file to final location
    if (!move_uploaded_file($fileTmp, $targetFile)) {
        die("Error: File upload failed.");
    }

    // Optional: process form data
    $name = htmlspecialchars($_POST['name'] ?? '');
    $email = htmlspecialchars($_POST['email'] ?? '');
    $subject = htmlspecialchars($_POST['subject'] ?? '');
    $message = htmlspecialchars($_POST['message'] ?? '');

    // Example: Save to a text log (or connect to a database/mail system)
    file_put_contents("form_submissions.log", date('Y-m-d H:i:s') . " - $name, $email, $subject\n", FILE_APPEND);

    // Redirect to thank-you page
    header("Location: https://lunyns.com/Thanks/Thanks.html");
    exit();
} else {
    // Reject any non-POST requests
    http_response_code(405);
    echo "Method Not Allowed";
}
?>


