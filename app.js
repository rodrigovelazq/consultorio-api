var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const Sequelize = require('sequelize');
const nconf = require('./config');
//var passport = require('passport');
//var LocalStrategy = require('passport-local').Strategy;
var app = express();
//const controller = require('./controller');
var env       = process.env.NODE_ENV || 'development';
var config    = require(__dirname + '/config/database.json')[env];

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
/*app.use(passport.initialize());
app.use(passport.session());*/
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});


app.use(require('./routes'));

/*passport.use(new LocalStrategy(controller.authentication.authenticate));
passport.serializeUser(controller.authentication.serializeUser);
passport.deserializeUser(controller.authentication.deserializeUser);*/

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  //res.render('error');
});

const username = nconf.get('database:user');
const password = nconf.get('database:password');
const dbName = nconf.get('database:name');
const options = nconf.get('database:options');

var connection = null;

if (config.use_env_variable) {
  connection = new Sequelize(process.env[config.use_env_variable], config);
  connection.authenticate().then(function(err) {
    app.listen(nconf.get('server:port'), function () {
      console.log(`Conectado a la base de datos y escuchando en el puerto: ${nconf.get('server:port')}`);
    });
  }).catch(function (err) {
    console.log('Unable to connect to the database:', err);
  });
} else {
  connection = new Sequelize(config.database, config.username, config.password, config);

}

connection.authenticate().then(function(err) {
  app.listen(nconf.get('server:port'), function () {
    console.log(`Conectado a la base de datos y escuchando en el puerto: ${nconf.get('server:port')}`);
  });
}).catch(function (err) {
  console.log('Unable to connect to the database:', err);
});

module.exports = app;