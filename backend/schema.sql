DROP TABLE IF EXISTS products;

CREATE TABLE products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_name TEXT NOT NULL,
    category TEXT NOT NULL,
    price REAL NOT NULL,
    brand TEXT NOT NULL,
    description TEXT,
    stock_quantity INTEGER NOT NULL DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO products
(product_name, category, price, brand, description, stock_quantity)
VALUES
('Laptop Pro 15', 'Laptop', 12500.00, 'TechPro', 'High-performance laptop for students and professionals', 10),

('Wireless Mouse', 'Accessories', 350.00, 'Logitech', 'Wireless optical mouse with USB receiver', 25),

('Mechanical Keyboard', 'Accessories', 850.00, 'Redragon', 'Mechanical gaming keyboard with RGB lighting', 15),

('Smartphone X1', 'Smartphone', 7500.00, 'Samsung', 'Modern smartphone with high-resolution camera', 12),

('USB-C Charger', 'Accessories', 450.00, 'Anker', 'Fast USB-C charging adapter', 30),

('Bluetooth Headphones', 'Audio', 1200.00, 'JBL', 'Wireless Bluetooth headphones with noise reduction', 20),

('27 Inch Monitor', 'Monitor', 4200.00, 'Dell', 'Full HD computer monitor for work and gaming', 8),

('External SSD 1TB', 'Storage', 1800.00, 'Kingston', 'Portable 1TB solid state drive', 18),

('Gaming Laptop', 'Laptop', 15500.00, 'Lenovo', 'High-performance gaming laptop', 6),

('Webcam HD', 'Accessories', 650.00, 'Logitech', 'HD webcam suitable for online meetings', 14);