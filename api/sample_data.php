<?php
// Include database connection
require_once '../db_config.php';

// Sample menu items
$menu_items = [
    [
        'name' => 'Cappuccino',
        'description' => 'A classic Italian coffee drink prepared with espresso, hot milk, and steamed milk foam.',
        'price' => 4.50,
        'category' => 'Coffee',
        'image_url' => 'assets/images/cappuccino.jpg'
    ],
    [
        'name' => 'Latte',
        'description' => 'A coffee drink made with espresso and steamed milk.',
        'price' => 4.00,
        'category' => 'Coffee',
        'image_url' => 'assets/images/latte.jpg'
    ],
    [
        'name' => 'Espresso',
        'description' => 'A concentrated form of coffee served in small, strong shots.',
        'price' => 3.00,
        'category' => 'Coffee',
        'image_url' => 'assets/images/espresso.jpg'
    ],
    [
        'name' => 'Croissant',
        'description' => 'A buttery, flaky, viennoiserie pastry named for its historical crescent shape.',
        'price' => 3.50,
        'category' => 'Pastry',
        'image_url' => 'assets/images/croissant.jpg'
    ],
    [
        'name' => 'Chocolate Cake',
        'description' => 'A rich, moist chocolate cake with chocolate frosting.',
        'price' => 5.50,
        'category' => 'Dessert',
        'image_url' => 'assets/images/chocolate-cake.jpg'
    ],
    [
        'name' => 'Avocado Toast',
        'description' => 'Toasted bread topped with mashed avocado, salt, pepper, and various other ingredients.',
        'price' => 8.50,
        'category' => 'Breakfast',
        'image_url' => 'assets/images/avocado-toast.jpg'
    ]
];

// Insert menu items
foreach ($menu_items as $item) {
    $name = mysqli_real_escape_string($conn, $item['name']);
    $description = mysqli_real_escape_string($conn, $item['description']);
    $price = $item['price'];
    $category = mysqli_real_escape_string($conn, $item['category']);
    $image_url = mysqli_real_escape_string($conn, $item['image_url']);
    
    $query = "INSERT INTO menu_items (name, description, price, category, image_url) 
              VALUES ('$name', '$description', $price, '$category', '$image_url')";
    
    $conn->query($query);
}

// Sample gallery items
$gallery_items = [
    [
        'title' => 'Cozy Corner',
        'description' => 'A cozy corner of our cafe where you can relax and enjoy your coffee.',
        'image_url' => 'assets/images/cafe-corner.jpg'
    ],
    [
        'title' => 'Coffee Art',
        'description' => 'Beautiful latte art created by our skilled baristas.',
        'image_url' => 'assets/images/coffee-art.jpg'
    ],
    [
        'title' => 'Outdoor Seating',
        'description' => 'Enjoy your coffee in our beautiful outdoor seating area.',
        'image_url' => 'assets/images/outdoor-seating.jpg'
    ],
    [
        'title' => 'Fresh Pastries',
        'description' => 'Our pastries are baked fresh daily.',
        'image_url' => 'assets/images/pastries.jpg'
    ]
];

// Insert gallery items
foreach ($gallery_items as $item) {
    $title = mysqli_real_escape_string($conn, $item['title']);
    $description = mysqli_real_escape_string($conn, $item['description']);
    $image_url = mysqli_real_escape_string($conn, $item['image_url']);
    
    $query = "INSERT INTO gallery (title, description, image_url) 
              VALUES ('$title', '$description', '$image_url')";
    
    $conn->query($query);
}

echo "Sample data inserted successfully!";

// Close connection
$conn->close();
?> 