<?php
session_start();

if (!isset($_SESSION['username'])) {
    header('Location: login.php');
    exit();
}

$current_page = 'homepage';
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Homepage</title>
    <style>
        body {
            margin: 0;
            font-family: Arial, sans-serif;
            background-color: #1e1e2f;
            color: #ffffff;
            display: flex;
        }

        .sidebar {
            width: 250px;
            background-color: #2f2f4f;
            padding: 20px;
            position: fixed;
            height: 100%;
            box-shadow: 3px 0 5px rgba(0,0,0,0.5);
        }

        .sidebar h2 {
            color: #da32e6;
            margin-bottom: 20px;
            text-align: center;
        }

        .sidebar a {
            display: block;
            padding: 10px;
            color: #ffffff;
            text-decoration: none;
            margin: 8px 0;
            border-radius: 5px;
            transition: background 0.3s ease;
        }

        .sidebar a:hover {
            background-color: #5d3c98;
        }

        .main {
            margin-left: 250px;
            padding: 20px;
            width: calc(100% - 250px);
        }

        .main h1 {
            color: #da32e6;
            text-shadow: 0 0 20px #da32e6;
        }

        footer {
            margin-top: 20px;
            text-align: center;
            font-size: 14px;
            color: #aaaaaa;
        }

        @media (max-width: 768px) {
            .sidebar {
                width: 200px;
            }
            .main {
                margin-left: 200px;
                width: calc(100% - 200px);
            }
        }
    </style>
</head>
<body>
    <div class="sidebar">
        <h2>Pterodactyl Panel</h2>
        <?php if ($current_page !== 'homepage'): ?>
            <a href="homepage.php">Dashboard</a>
        <?php endif; ?>
        <a href="servers.php">Servers</a>
        <?php if ($current_page !== 'servers'): ?>
            <a href="settings.php">Settings</a>
        <?php endif; ?>
        <a href="logout.php">Logout</a>
    </div>

    <div class="main">
        <h1>Welcome, <?php echo htmlspecialchars($_SESSION['username']); ?>!</h1>
        <p>Your account role: <?php echo $_SESSION['is_admin'] === 'true' ? 'Admin' : 'User'; ?></p>
        <p>Pterodactyl api</p>
    </div>

    <footer>
        &copy; <?php echo date("Y"); ?> Plaxinova. All rights reserved.
    </footer>
</body>
</html>
