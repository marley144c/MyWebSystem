const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./db');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Home route
app.get('/', (req, res) => {
    res.json({
        message: 'ICT251 Products CRUD API is running'
    });
});

// GET all products
app.get('/api/products', (req, res) => {
    const sql = 'SELECT * FROM products ORDER BY id';

    db.all(sql, [], (err, rows) => {
        if (err) {
            return res.status(500).json({
                error: err.message
            });
        }

        res.json(rows);
    });
});

// GET one product
app.get('/api/products/:id', (req, res) => {
    const sql = 'SELECT * FROM products WHERE id = ?';

    db.get(sql, [req.params.id], (err, row) => {
        if (err) {
            return res.status(500).json({
                error: err.message
            });
        }

        if (!row) {
            return res.status(404).json({
                error: 'Product not found'
            });
        }

        res.json(row);
    });
});

// POST - create product
app.post('/api/products', (req, res) => {
    const {
        product_name,
        category,
        price,
        brand,
        description,
        stock_quantity
    } = req.body;

    if (!product_name || !category || price === undefined || !brand ||
        stock_quantity === undefined) {
        return res.status(400).json({
            error: 'product_name, category, price, brand and stock_quantity are required'
        });
    }

    const sql = `
        INSERT INTO products
        (product_name, category, price, brand, description, stock_quantity)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    const values = [
        product_name,
        category,
        price,
        brand,
        description || '',
        stock_quantity
    ];

    db.run(sql, values, function (err) {
        if (err) {
            return res.status(500).json({
                error: err.message
            });
        }

        db.get(
            'SELECT * FROM products WHERE id = ?',
            [this.lastID],
            (err, row) => {
                if (err) {
                    return res.status(500).json({
                        error: err.message
                    });
                }

                res.status(201).json(row);
            }
        );
    });
});

// PUT - update product
app.put('/api/products/:id', (req, res) => {
    const {
        product_name,
        category,
        price,
        brand,
        description,
        stock_quantity
    } = req.body;

    if (!product_name || !category || price === undefined || !brand ||
        stock_quantity === undefined) {
        return res.status(400).json({
            error: 'product_name, category, price, brand and stock_quantity are required'
        });
    }

    const sql = `
        UPDATE products
        SET product_name = ?,
            category = ?,
            price = ?,
            brand = ?,
            description = ?,
            stock_quantity = ?,
            updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
    `;

    const values = [
        product_name,
        category,
        price,
        brand,
        description || '',
        stock_quantity,
        req.params.id
    ];

    db.run(sql, values, function (err) {
        if (err) {
            return res.status(500).json({
                error: err.message
            });
        }

        if (this.changes === 0) {
            return res.status(404).json({
                error: 'Product not found'
            });
        }

        db.get(
            'SELECT * FROM products WHERE id = ?',
            [req.params.id],
            (err, row) => {
                if (err) {
                    return res.status(500).json({
                        error: err.message
                    });
                }

                res.json(row);
            }
        );
    });
});

// DELETE - delete product
app.delete('/api/products/:id', (req, res) => {
    const sql = 'DELETE FROM products WHERE id = ?';

    db.run(sql, [req.params.id], function (err) {
        if (err) {
            return res.status(500).json({
                error: err.message
            });
        }

        if (this.changes === 0) {
            return res.status(404).json({
                error: 'Product not found'
            });
        }

        res.json({
            message: 'Product deleted successfully',
            id: Number(req.params.id)
        });
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});