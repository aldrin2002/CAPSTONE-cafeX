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
    !empty($data->email) &&
    !empty($data->password)
) {
    // Sanitize input
    $email = mysqli_real_escape_string($conn, $data->email);
    $password = mysqli_real_escape_string($conn, $data->password);
    
    // Check if email exists
    $query = "SELECT id, fullname, email, password FROM users WHERE email = '$email'";
    $result = $conn->query($query);
    
    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $id = $row['id'];
        $fullname = $row['fullname'];
        $email = $row['email'];
        $hashed_password = $row['password'];
        
        // Verify password
        if (password_verify($password, $hashed_password)) {
            // Password is correct
            
            // Create simple token (in a real app, use JWT)
            $token = bin2hex(random_bytes(16));
            
            // Return user data
            http_response_code(200);
            echo json_encode(array(
                "message" => "Login successful.",
                "token" => $token,
                "user" => array(
                    "id" => $id,
                    "fullname" => $fullname,
                    "email" => $email
                )
            ));
        } else {
            // Password is incorrect
            http_response_code(401);
            echo json_encode(array("message" => "Invalid credentials."));
        }
    } else {
        // Email not found
        http_response_code(401);
        echo json_encode(array("message" => "Invalid credentials."));
    }
} else {
    // Data is incomplete
    http_response_code(400);
    echo json_encode(array("message" => "Unable to login. Data is incomplete."));
}

// Close connection
$conn->close();
?> 