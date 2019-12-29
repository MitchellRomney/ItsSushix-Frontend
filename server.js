const express = require('express');
const serveStatic = require('serve-static');
const history = require('connect-history-api-fallback');
const sslRedirect = require('heroku-ssl-redirect');

let app = express()

app.use(history())
app.use(serveStatic(__dirname + "/dist"))
app.use(sslRedirect())

let port = process.env.PORT || 5000
app.listen(port)