<?php
session_start();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $reg_username = $_POST['username'];
    $reg_password = $_POST['password'];

    // Encrypt the password for storage
    $encrypt_method = "AES-256-CBC";
    $secret_key = 'your_secret_key_here'; // Change this to a secure, random key
    $iv_password = openssl_random_pseudo_bytes(openssl_cipher_iv_length($encrypt_method));
    
    $encrypted_password = openssl_encrypt($reg_password, $encrypt_method, $secret_key, 0, $iv_password);
    
    // Combine the encrypted password with the IV for storage
    $encrypted_password = base64_encode($encrypted_password . '::' . $iv_password);

    // Load existing users for users.json
    $users = json_decode(file_get_contents('users.json'), true) ?? [];
    $users[] = [
        'username' => $reg_username,
        'password' => $encrypted_password
    ];

    // Save users back to users.json
    file_put_contents('users.json', json_encode($users));

    // Add new account details to accounts.txt (defaulting to not admin)
    file_put_contents('accounts.txt', "$reg_username:false\n", FILE_APPEND);

    header('Location: homepage.php');
    exit();
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Register</title>
    <style>
        body {
            background-color: #111;
            color: #eee;
            font-family: Arial, sans-serif;
        }

        h2 {
            color: #da32e6; /* Purple */
            text-shadow: 0 0 20px #da32e6; /* Purple neon glow */
        }

        input[type="text"], input[type="password"] {
            padding: 10px;
            margin: 10px 0;
            border: 2px solid cyan; /* Border color */
            border-radius: 5px;
            outline: none;
            color: white; /* Input text color */
            background-color: #222; /* Dark background for input */
            transition: border-color 0.3s ease; /* Smooth transition */
        }

        input[type="text"]:focus, input[type="password"]:focus {
            border-color: cyan; /* Cyan border on focus */
            box-shadow: 0 0 10px cyan, 0 0 20px cyan; /* Neon glow effect */
        }

        button {
            padding: 10px;
            color: #fff;
            background-color: #5d3c98; /* A dark purple */
            border: none;
            border-radius: 5px;
            cursor: pointer;
            transition: background 0.3s ease;
            font-size: 16px;
        }

        button:hover {
            background-color: #7a56be; /* Lighten on hover */
        }

        a {
            color: #da32e6; /* Purple link color */
            text-shadow: 0 0 10px #da32e6; /* Purple neon glow */
        }

        a:hover {
            text-shadow: 0 0 20px #da32e6; /* Intense glow on hover */
        }

        p {
            color: #ffffff;
        }
    </style>
</head>
<body>
    <h2>Register</h2>
    <form action="" method="POST">
        <input type="text" name="username" placeholder="Username" required>
        <input type="password" name="password" placeholder="Password" required>
        <button type="submit">Register</button>
    </form>
    <p>Already have an account? <a href="login.php">Login here</a></p>
</body>
</html>
