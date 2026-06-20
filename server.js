require('dotenv').config();

const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT;

app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use(( req, res, next) => {
    console.log( `${req.method} ${req.url}`);
    next();
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/user/:id', (req, res) => {
  res.send(`User ${req.params.id} profile`);
});

app.post('/user', (req, res) => {
  const { name, email } = req.body;
  if( !name || !email) return res.status(400).json({ error: 'Missing data' });
  res.status(201).json({ message: `Hello, ${name}!` });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
