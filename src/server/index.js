import conf from './config/config.js';

var express = require('express');
var bodyparse = require('body-parser');
var morgan = require('morgan');

var app = express();
app.use(morgan('dev'));
app.use(bodyparse.urlencoded({ extended: true }));
app.use(bodyparse.json());

app.use('/', express.static('./src/client'));
app.use('/libs',  express.static('./bower_components'));

app.listen(conf.SERVER_PORT, () => {
	console.log('Init Server');
});

module.exports = app;