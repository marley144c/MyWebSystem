const fs = require('fs');
const db = require('./db');

const schema = fs.readFileSync('./schema.sql', 'utf8');

db.exec(schema, (err) => {
    if (err) {
        console.error('Error creating database:', err.message);
    } else {
        console.log('Database and products table created successfully.');
    }

    db.close();
});