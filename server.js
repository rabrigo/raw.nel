const path = require('path');
const http = require('http');
const express = require('express');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.send('Hello, Express!');
});

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Now listening on http://localhost:${PORT}/`);
});