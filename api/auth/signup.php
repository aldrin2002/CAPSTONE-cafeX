<?php
// Allow cross-origin requests
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    // Just exit with 200 OK status
    http_response_code(200);
    exit;
}

// Include database connection
require_once '../../db_config.php';

// Get posted data
$data = json_decode(file_get_contents("php://input"));

// Check if data is not empty
if (
    !empty($data->fullname) &&
    !empty($data->email) &&
    !empty($data->password) &&
    !empty($data->phone)
) {
    // Sanitize input
    $fullname = mysqli_real_escape_string($conn, $data->fullname);
    $email = mysqli_real_escape_string($conn, $data->email);
    $password = mysqli_real_escape_string($conn, $data->password);
    $phone = mysqli_real_escape_string($conn, $data->phone);
    
    // Check if email already exists
    $check_email = "SELECT email FROM users WHERE email = '$email'";
    $result = $conn->query($check_email);
    
    if ($result->num_rows > 0) {
        // Email already exists
        http_response_code(400);
        echo json_encode(array("message" => "Email already exists."));
    } else {
        // Hash the password
        $hashed_password = password_hash($password, PASSWORD_DEFAULT);
        
        // Create user
        $query = "INSERT INTO users (fullname, email, password, phone) VALUES ('$fullname', '$email', '$hashed_password', '$phone')";
        
        if ($conn->query($query)) {
            // User created
            http_response_code(201);
            echo json_encode(array("message" => "User registered successfully."));
        } else {
            // Failed to create user
            http_response_code(500);
            echo json_encode(array("message" => "Unable to register user."));
        }
    }
} else {
    // Data is incomplete
    http_response_code(400);
    echo json_encode(array("message" => "Unable to register user. Data is incomplete."));
}

// Close connection
$conn->close();
?> 