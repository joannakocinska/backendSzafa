var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var shoesRouter = require('./routes/shoes');
var secureRouter = require('./routes/secure');
var authenticateToken = require('./middlewares/TokenAuth');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type,X-Auth-Token');
    if (req.method === 'OPTIONS') {
        return res.status(200).json(null);
    }
    return next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/shoes', shoesRouter);
app.use('/secure', authenticateToken, secureRouter);

module.exports = app;
