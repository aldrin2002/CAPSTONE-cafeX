<?php
// Allow cross-origin requests
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    // Just exit with 200 OK status
    http_response_code(200);
    exit;
}

// Include database connection
require_once '../../db_config.php';

// Get menu items
$query = "SELECT * FROM menu_items ORDER BY category, name";
$result = $conn->query($query);

if ($result->num_rows > 0) {
    // Menu items found
    $menu_items = array();
    
    while ($row = $result->fetch_assoc()) {
        $menu_items[] = array(
            "id" => $row['id'],
            "name" => $row['name'],
            "description" => $row['description'],
            "price" => $row['price'],
            "category" => $row['category'],
            "image_url" => $row['image_url']
        );
    }
    
    // Return menu items
    http_response_code(200);
    echo json_encode($menu_items);
} else {
    // No menu items found
    http_response_code(404);
    echo json_encode(array("message" => "No menu items found."));
}

// Close connection
$conn->close();
?> 