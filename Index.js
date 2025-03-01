const express = require('express');
const { Pool } = require('pg'); // PostgreSQL library

const app = express();
app.use(express.json()); // To parse JSON request bodies

const pool = new Pool({ /* your PostgreSQL connection details */ });


app.post('/verify', async (req, res) => {
    const { name, phone, code } = req.body;

    try {
        const result = await pool.query('SELECT * FROM codes WHERE code = $1', [code]);
        if (result.rows.length > 0) {
            res.json({ used: true }); // Code already exists
        } else {
            // Insert the new code (and optionally name and phone) into the database:
            await pool.query('INSERT INTO codes (code, name, phone) VALUES ($1, $2, $3)', [code, name, phone]);
            res.json({ used: false });
        }
    } catch (error) {
        console.error("Database error:", error);
        res.status(500).json({ error: 'Database error' });
    }
});

app.listen(3000, () => console.log('Server listening on port 3000'));

