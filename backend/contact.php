<?php
/**
 * GT ARSENALS LTD — Contact Form Backend (PHP)
 * File: backend/contact.php
 *
 * HOW TO USE:
 * 1. Upload this file to your hosting server in the /backend/ folder
 * 2. Update the $TO_EMAIL variable below with your real email
 * 3. Make sure your hosting has PHP's mail() or configure SMTP (recommended)
 * 4. In js/main.js, uncomment: await submitToBackend(form, '/backend/contact.php');
 *    and delete the simulateSubmit() line
 *
 * FOR BETTER EMAIL DELIVERY (recommended):
 * Use PHPMailer with SMTP instead of PHP's built-in mail().
 * This prevents emails from going to spam.
 * See the PHPMailer section below (commented out).
 *
 * REQUIREMENTS:
 * - PHP 7.4+
 * - Hosting with email/SMTP support (most Nigerian cPanel hosts have this)
 */

// ── CONFIGURATION — UPDATE THESE ──────────────────────────────
define('TO_EMAIL',    'info@gtarsenals.com');      // ← Your receiving email
define('FROM_EMAIL',  'noreply@gtarsenals.com');   // ← Must be on your domain
define('COMPANY',     'GT Arsenals Ltd');
define('SITE_URL',    'https://gtarsenals.com');

// ── CORS HEADERS ───────────────────────────────────────────────
// Allow requests only from your own domain
$allowed_origins = ['https://gtarsenals.com', 'https://www.gtarsenals.com'];
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';

if (in_array($origin, $allowed_origins)) {
    header("Access-Control-Allow-Origin: $origin");
}
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Accept');
header('Content-Type: application/json; charset=utf-8');

// Handle OPTIONS preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Only accept POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

// ── READ + SANITIZE INPUT ──────────────────────────────────────
$raw = file_get_contents('php://input');
$data = json_decode($raw, true);

// Fallback to $_POST if not JSON
if (!$data) {
    $data = $_POST;
}

$name    = trim(strip_tags($data['name']    ?? ''));
$email   = trim(strip_tags($data['email']   ?? ''));
$phone   = trim(strip_tags($data['phone']   ?? ''));
$service = trim(strip_tags($data['service'] ?? ''));
$message = trim(strip_tags($data['message'] ?? ''));

// ── VALIDATION ──────────────────────────────────────────────────
$errors = [];
if (empty($name))             $errors[] = 'Name is required';
if (empty($email))            $errors[] = 'Email is required';
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) $errors[] = 'Invalid email address';
if (empty($message))          $errors[] = 'Message is required';
if (strlen($message) < 10)   $errors[] = 'Message is too short';

if (!empty($errors)) {
    http_response_code(422);
    echo json_encode(['success' => false, 'message' => implode('. ', $errors)]);
    exit;
}

// ── SPAM CHECK — Honeypot ──────────────────────────────────────
// Add a hidden field named 'website' in your HTML form — bots fill it, humans don't
if (!empty($data['website'])) {
    // Silently reject spam without revealing detection
    http_response_code(200);
    echo json_encode(['success' => true, 'message' => 'Message received!']);
    exit;
}

// ── BUILD EMAIL ────────────────────────────────────────────────
$subject = "New Inquiry from $name — GT Arsenals Website";

// Plain text version
$body_plain = "New contact form submission from the GT Arsenals website.\n\n";
$body_plain .= "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";
$body_plain .= "Name:    $name\n";
$body_plain .= "Email:   $email\n";
if ($phone)   $body_plain .= "Phone:   $phone\n";
if ($service) $body_plain .= "Service: $service\n";
$body_plain .= "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";
$body_plain .= "Message:\n$message\n\n";
$body_plain .= "Sent from: " . SITE_URL . "\n";
$body_plain .= "Time: " . date('D, d M Y H:i:s T') . "\n";

// HTML version
$body_html = "
<!DOCTYPE html>
<html>
<head><meta charset='utf-8'><title>New Inquiry</title></head>
<body style='font-family: Arial, sans-serif; background: #f4f6fa; padding: 20px;'>
  <div style='max-width: 580px; margin: 0 auto; background: #fff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1);'>
    
    <!-- Header -->
    <div style='background: #1E5FB9; padding: 28px 32px;'>
      <h2 style='color: #fff; margin: 0; font-size: 1.2rem; letter-spacing: 0.05em;'>GT ARSENALS LTD</h2>
      <p style='color: rgba(255,255,255,0.75); margin: 6px 0 0; font-size: 0.85rem;'>New Website Inquiry</p>
    </div>

    <!-- Body -->
    <div style='padding: 32px;'>
      <p style='color: #4b5a6e; margin-bottom: 24px;'>A new contact form submission has been received:</p>

      <table style='width: 100%; border-collapse: collapse;'>
        <tr>
          <td style='padding: 10px 14px; background: #f1f5fb; border-radius: 8px 8px 0 0; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: #94a3b8;'>Name</td>
        </tr>
        <tr><td style='padding: 10px 14px 18px; font-size: 1rem; font-weight: 600; color: #1e2635;'>" . htmlspecialchars($name) . "</td></tr>

        <tr>
          <td style='padding: 10px 14px; background: #f1f5fb; border-radius: 8px 8px 0 0; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: #94a3b8;'>Email</td>
        </tr>
        <tr><td style='padding: 10px 14px 18px; font-size: 1rem; color: #1e2635;'><a href='mailto:" . htmlspecialchars($email) . "' style='color: #1E5FB9;'>" . htmlspecialchars($email) . "</a></td></tr>
";

if ($phone) {
    $body_html .= "
        <tr>
          <td style='padding: 10px 14px; background: #f1f5fb; border-radius: 8px 8px 0 0; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: #94a3b8;'>Phone / WhatsApp</td>
        </tr>
        <tr><td style='padding: 10px 14px 18px; font-size: 1rem; color: #1e2635;'>" . htmlspecialchars($phone) . "</td></tr>
    ";
}

if ($service) {
    $body_html .= "
        <tr>
          <td style='padding: 10px 14px; background: #f1f5fb; border-radius: 8px 8px 0 0; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: #94a3b8;'>Interested In</td>
        </tr>
        <tr><td style='padding: 10px 14px 18px; font-size: 1rem; color: #1E5FB9; font-weight: 600;'>" . htmlspecialchars($service) . "</td></tr>
    ";
}

$body_html .= "
        <tr>
          <td style='padding: 10px 14px; background: #f1f5fb; border-radius: 8px 8px 0 0; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: #94a3b8;'>Message</td>
        </tr>
        <tr>
          <td style='padding: 14px; background: #f8fafc; border-radius: 8px; font-size: 0.95rem; color: #4b5a6e; line-height: 1.7; border-left: 3px solid #1E5FB9;'>
            " . nl2br(htmlspecialchars($message)) . "
          </td>
        </tr>
      </table>

      <div style='margin-top: 28px; padding: 14px; background: #e8f0fb; border-radius: 8px;'>
        <p style='margin: 0; font-size: 0.8rem; color: #1E5FB9;'>
          ⏰ Sent on " . date('D, d M Y \a\t H:i T') . "
          &nbsp;|&nbsp; 🌐 " . SITE_URL . "
        </p>
      </div>
    </div>

    <!-- Footer -->
    <div style='background: #060b18; padding: 18px 32px; text-align: center;'>
      <p style='color: rgba(255,255,255,0.4); font-size: 0.75rem; margin: 0;'>
        GT Arsenals Ltd — RC Number: 8340467 — Old Secretariat, Garki 1, Abuja, FCT
      </p>
    </div>
  </div>
</body>
</html>";

// ── SEND EMAIL ──────────────────────────────────────────────────
$boundary = md5(time());
$headers  = implode("\r\n", [
    "From: " . COMPANY . " Website <" . FROM_EMAIL . ">",
    "Reply-To: $name <$email>",
    "MIME-Version: 1.0",
    "Content-Type: multipart/alternative; boundary=\"$boundary\"",
    "X-Mailer: PHP/" . phpversion(),
]);

$body = "--$boundary\r\n"
    . "Content-Type: text/plain; charset=UTF-8\r\n"
    . "Content-Transfer-Encoding: 8bit\r\n\r\n"
    . $body_plain . "\r\n"
    . "--$boundary\r\n"
    . "Content-Type: text/html; charset=UTF-8\r\n"
    . "Content-Transfer-Encoding: 8bit\r\n\r\n"
    . $body_html . "\r\n"
    . "--$boundary--";

$sent = mail(TO_EMAIL, $subject, $body, $headers);

// ── SEND AUTO-REPLY TO CLIENT ───────────────────────────────────
if ($sent) {
    $auto_subject = "We received your message — GT Arsenals Ltd";
    $auto_body    = "Hello $name,\n\n"
        . "Thank you for reaching out to GT Arsenals Ltd.\n\n"
        . "We have received your inquiry"
        . ($service ? " about $service" : "") . " and "
        . "will get back to you within 24 hours.\n\n"
        . "For faster responses, you can reach us on WhatsApp.\n\n"
        . "Best regards,\n"
        . "GT Arsenals Ltd\n"
        . SITE_URL . "\n"
        . "Old Secretariat, Garki 1, Abuja, FCT\n"
        . "RC: 8340467";

    $auto_headers = implode("\r\n", [
        "From: " . COMPANY . " <" . FROM_EMAIL . ">",
        "Content-Type: text/plain; charset=UTF-8",
    ]);

    mail($email, $auto_subject, $auto_body, $auto_headers);
}

// ── RESPOND ─────────────────────────────────────────────────────
if ($sent) {
    http_response_code(200);
    echo json_encode(['success' => true,  'message' => 'Message sent successfully!']);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Failed to send. Please try again or contact us directly.']);
}
?>
