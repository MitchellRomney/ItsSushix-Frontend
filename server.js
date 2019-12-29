const express = require('express');
const serveStatic = require('serve-static');
const history = require('connect-history-api-fallback');

let app = express();
app.use(history());
app.use(serveStatic(__dirname + "/dist"));

let port = process.env.PORT || 5000;
app.listen(port);