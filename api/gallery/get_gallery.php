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

// Get gallery items
$query = "SELECT * FROM gallery ORDER BY created_at DESC";
$result = $conn->query($query);

if ($result->num_rows > 0) {
    // Gallery items found
    $gallery_items = array();
    
    while ($row = $result->fetch_assoc()) {
        $gallery_items[] = array(
            "id" => $row['id'],
            "title" => $row['title'],
            "description" => $row['description'],
            "image_url" => $row['image_url'],
            "created_at" => $row['created_at']
        );
    }
    
    // Return gallery items
    http_response_code(200);
    echo json_encode($gallery_items);
} else {
    // No gallery items found
    http_response_code(404);
    echo json_encode(array("message" => "No gallery items found."));
}

// Close connection
$conn->close();
?> 