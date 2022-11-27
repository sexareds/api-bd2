import express from 'express';
import { pool } from './db.js';

const app = express();

app.get('/ping', async (req, res) => {
  const [result] = await pool.query('SELECT 1 + 1 AS result');
  res.json(result[0]);
});

app.get('/employees', (req, res) => {
  res.send('Obtaining employees');
});
 
app.post('/employees', (req, res) => {
  res.send('Creating employees');
});

app.put('/employees', (req, res) => {
  res.send('Updating employees');
});

app.delete('/employees', (req, res) => {
  res.send('Deleting employees');
});


app.listen(3000);
console.log('Server running on port 3000');