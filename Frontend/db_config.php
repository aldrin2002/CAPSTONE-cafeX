<?php
// Database configuration
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "cafex_db";

// Create connection
$conn = new mysqli($servername, $username, $password);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Create database if it doesn't exist
$sql = "CREATE DATABASE IF NOT EXISTS $dbname";
if ($conn->query($sql) === TRUE) {
    // echo "Database created successfully or already exists";
} else {
    echo "Error creating database: " . $conn->error;
}

// Select the database
$conn->select_db($dbname);

// Create users table if it doesn't exist
$sql = "CREATE TABLE IF NOT EXISTS users (
    id INT(11) AUTO_INCREMENT PRIMARY KEY,
    fullname VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)";

if ($conn->query($sql) === TRUE) {
    // echo "Table users created successfully or already exists";
} else {
    echo "Error creating table: " . $conn->error;
}

// Create menu_items table if it doesn't exist
$sql = "CREATE TABLE IF NOT EXISTS menu_items (
    id INT(11) AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    category VARCHAR(50),
    image_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)";

if ($conn->query($sql) === TRUE) {
    // echo "Table menu_items created successfully or already exists";
} else {
    echo "Error creating table: " . $conn->error;
}

// Create gallery table if it doesn't exist
$sql = "CREATE TABLE IF NOT EXISTS gallery (
    id INT(11) AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    image_url VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)";

if ($conn->query($sql) === TRUE) {
    // echo "Table gallery created successfully or already exists";
} else {
    echo "Error creating table: " . $conn->error;
}
?> 