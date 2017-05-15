'use strict';

var express		= require('express');
var app			= express();
var bodyParser 	= require('body-parser');
var fs = require('fs');
var http = require('http');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

require('./routes')(app);

/* Must be the last call to app.use */
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(err.status || 500).send({ error: err.message || '' });
});

app.set('port', process.env.PORT || 5007);

// your express configuration here
var httpServer = http.createServer(app);
httpServer.listen(app.get('port'),function() {
    console.log('running on port', app.get('port'))
});
