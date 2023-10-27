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

// beginning here is from Microsoft example
const on404Error = (req, res, next) => {
  next(createError(404));
};

const onRouteErrors = (err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error', err);
};

const checkTrailingSlash = (req, res, next) => {
  const trailingSlashUrl = req.baseUrl + req.url;
  if (req.originalUrl !== trailingSlashUrl) {
    res.redirect(301, trailingSlashUrl);
  } else {
    next();
  }
};

export default async (app) => {
  // Static files with cache
  app.use(
    express.static('public', {
      maxAge: '1d',
      cacheControl: true,
    }),
  );
}

app.use(checkTrailingSlash);

// ends here

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