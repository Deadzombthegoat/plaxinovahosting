<?php
session_start();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $log_username = $_POST['username'];
    $log_password = $_POST['password'];

    $encrypt_method = "AES-256-CBC";
    $secret_key = 'your_secret_key_here'; // Use the same key as in register.php

    // Load users from users.json
    $users = json_decode(file_get_contents('users.json'), true);
    $login_success = false;

    foreach ($users as $user) {
        if ($user['username'] === $log_username) {
            // Decrypt the password
            list($encrypted_data_password, $iv_password) = explode('::', base64_decode($user['password']), 2);
            $decrypted_password = openssl_decrypt($encrypted_data_password, $encrypt_method, $secret_key, 0, $iv_password);

            if ($decrypted_password === $log_password) {
                $_SESSION['username'] = $log_username;

                // Check if admin
                $accounts = file('accounts.txt', FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
                foreach ($accounts as $account) {
                    list($username, $is_admin) = explode(':', $account);
                    if ($username === $log_username) {
                        $_SESSION['is_admin'] = $is_admin; // Store admin status
                        break;
                    }
                }

                $login_success = true;
                break;
            }
        }
    }

    if ($login_success) {
        header('Location: homepage.php');
        exit();
    } else {
        echo "Invalid credentials.";
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Login</title>
    <style>
        body {
            background-color: #111;
            color: #eee;
            font-family: Arial, sans-serif;
        }

        h2 {
            color: #da32e6;
            text-shadow: 0 0 20px #da32e6;
        }

        input[type="text"], input[type="password"] {
            padding: 10px;
            margin: 10px 0;
            border: 2px solid cyan;
            border-radius: 5px;
            outline: none;
            color: white;
            background-color: #222;
            transition: border-color 0.3s ease;
        }

        input[type="text"]:focus, input[type="password"]:focus {
            border-color: cyan;
            box-shadow: 0 0 10px cyan, 0 0 20px cyan;
        }

        button {
            padding: 10px;
            color: #fff;
            background-color: #5d3c98;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            transition: background 0.3s ease;
            font-size: 16px;
        }

        button:hover {
            background-color: #7a56be;
        }

        a {
            color: #da32e6;
            text-shadow: 0 0 10px #da32e6;
        }

        a:hover {
            text-shadow: 0 0 20px #da32e6;
        }

        p {
            color: #ffffff;
        }
    </style>
</head>
<body>
    <h2>Login</h2>
    <form action="" method="POST">
        <input type="text" name="username" placeholder="Username" required>
        <input type="password" name="password" placeholder="Password" required>
        <button type="submit">Login</button>
    </form>
    <p>Don't have an account? <a href="register.php">Register here</a></p>
</body>
</html>
