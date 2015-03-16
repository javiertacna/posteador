
/**
 * Module dependencies.
 */
var express = require('express.io');
//var express = require('express');
var http = require('http');
var path = require('path');
var swig = require('swig');
var url = require('url');
var _ = require('underscore');
var app = express();
app.http().io();

// all environments
app.use(express.cookieParser());
app.use(express.session({secret: '1234567890QWERTY'}));
app.use(express.bodyParser());

app.set('port', 3000);

app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('./public'));

app.use(express.logger());



require('./routes')(app)



app.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
