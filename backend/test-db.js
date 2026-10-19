const db = require('./db');

db.all('SELECT * FROM products', [], (err, rows) => {
    if (err) {
        console.error(err.message);
        return;
    }

    console.table(rows);
    db.close();
});