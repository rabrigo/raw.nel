import path from 'path';
import express from 'express';
// import * as ejs from 'ejs';
import http from 'http';
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';

const app = express();
const port = 3000;

// get root directory for paths
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// Configure view engine to return HTML
app.set('public', path.join(__dirname, './public'));
// app.set('public engine', 'html');
// app.engine('.html', ejs.__express);
app.use(express.static(path.join(__dirname, 'public')));

// app.get('/', (req, res) => {
//   res.send('It works!!');
// });

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Now listening on http://localhost:${port}/`);
});