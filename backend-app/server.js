// server.js
const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const { Pool } = require('pg');

// PostgreSQL configuration
const pool = new Pool({
  user: 'postgres',
  host: 'db',
  database: 'todo_db',
  password: 'password',
  port: 5432,
});

// API endpoint to fetch todos
app.get('/api/todos', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM todos');
    const todos = result.rows;
    client.release();
    res.json(todos);
  } catch (err) {
    console.error('Error executing query', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
