var mongoose = require('mongoose'),
  express = require('express'),
  bodyParser = require('body-parser'),
  request = require('request'),
  secret = require('./config/secret'),
  db_settings = require('./config/db'),
  session = require('express-session'),
  _ = require('lodash');

var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function() {
});
var app = express();
app.set('view engine', 'jade');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));
app.use(session({
  secret: 'keyboard cat',
  cookie: {}
}));

function loggedIn(req, res, next){
  if(req.session.login==true){
    next();
  } else {
    res.redirect('/login');
  }
}

var server = app.listen(3333, function(){
  var host = server.address().address;
  var port = server.address().port;
  console.log('example app listening at http://%s:%s', host, port);
});
mongoose.connect(db_settings.db);

app.get('/', function(req, res){
  res.render('index');
}
)