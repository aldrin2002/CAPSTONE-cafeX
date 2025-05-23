<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

ob_start();

// Allow requests from any origin
header('Access-Control-Allow-Origin: *');

// Allow specific HTTP methods
header('Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE');

// Allow specific headers
header('Access-Control-Allow-Headers: Content-Type, X-Auth-Token, Origin, Authorization');

// Set Content-Type header to application/json for all responses
header('Content-Type: application/json');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD'])) {
        header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
    }

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS'])) {
        header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
    }

    exit(0);
}

require_once('./config/dbConfig.php');
require_once('./services/auth.php');

$con = new DatabaseAccess();
$pdo = $con->connect();

$Auth = new Auth($pdo);

// Check if 'request' parameter is set in the request
if (isset($_REQUEST['request'])) {
    // Split the request into an array based on '/'
    $request = explode('/', $_REQUEST['request']);
} else {
    // If 'request' parameter is not set, return a 404 response
    echo json_encode(["error" => "Not Found"]);
    http_response_code(404);
    exit();
}

// Handle requests based on HTTP method
switch ($_SERVER['REQUEST_METHOD']) {
    case 'POST':
        $data = json_decode(file_get_contents("php://input"));
        switch ($request[0]) {
            case 'login':
                if (isset($data->email) && isset($data->password)) {
                    echo json_encode($Auth->loginUser($data->email, $data->password));
                } else {
                    echo json_encode([
                        'status' => 400,
                        'message' => 'Invalid input data'
                    ]);
                }
                break;
            case 'register':
                echo json_encode($Auth->registerUser());
                break;
            default:
                echo "This is forbidden";
                http_response_code(403);
                break;
        }
        break;
    case 'GET':
        // Handle GET requests here
        break;
    case 'PUT':
        // Handle PUT requests here
        break;
    case 'DELETE':
        // Handle DELETE requests here
        break;
    default:
        echo json_encode(["error" => "Not Found"]);
        http_response_code(404);
        break;
}
?>