<?php

require_once(__DIR__ . '/../config/dbConfig.php');

class Auth {
    private $conn;

    public function __construct() {
        $databaseService = new DatabaseAccess();
        $this->conn = $databaseService->connect();

        header("Access-Control-Allow-Origin: * ");
        header("Content-Type: application/json; charset=UTF-8");
        header("Access-Control-Allow-Methods: POST");
        header("Access-Control-Max-Age: 3600");
        header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    }

    public function registerUser() {
        // Get POST data
        $data = json_decode(file_get_contents("php://input"));
    
        // Check if all required fields are provided and not empty
        if (
            empty($data->email) ||
            empty($data->password) ||
            empty($data->fullname) ||
            empty($data->phone)
        ) {
            http_response_code(400);
            return array("message" => "All fields are required.");
        }
    
        // Extract data
        $email = $data->email;
        $password = $data->password;
        $fullName = $data->fullname;
        $phone = $data->phone;
    
        // Prepare the SQL statement
        $query = "INSERT INTO users (fullname, email, password, phone) VALUES (:fullname, :email, :password, :phone)";
        $stmt = $this->conn->prepare($query);
    
        // Bind parameters
        $stmt->bindParam(':email', $email);
        $password_hash = password_hash($password, PASSWORD_BCRYPT);
        $stmt->bindParam(':password', $password_hash);
        $stmt->bindParam(':fullname', $fullName);
        $stmt->bindParam(':phone', $phone);

        // Execute the statement
        if ($stmt->execute()) {
            http_response_code(201);
            return array("message" => "User was created.");
        } else {
            http_response_code(503);
            return array("message" => "Unable to create user.");
        }
    }

    public function loginUser($email, $password) {
        // Prepare the SQL statement
        $query = "SELECT * FROM users WHERE email = :email";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':email', $email);
        $stmt->execute();
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($user && password_verify($password, $user['password'])) {
            // Generate a token (for simplicity, using a random string here)
            $token = bin2hex(random_bytes(16));
            http_response_code(200);
            return ["message" => "Login successful!", "token" => $token, "user" => $user];
        } else {
            http_response_code(401);
            return ["message" => "Invalid email or password"];
        }
    }
}
?>