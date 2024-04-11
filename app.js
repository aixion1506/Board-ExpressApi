const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const dayjs = require('dayjs');
const logger = require('morgan');
const createError = require('http-errors');
const cookieParser = require('cookie-parser');

const indexRouter = require('./routes/index');
const postsRouter = require('./routes/posts');
const authRouter = require('./routes/auth');

const loginRequired = require('./middlewares/login-required');

require('./passport')();

mongoose.connect('mongodb://localhost:27017/simple-board');

mongoose.connection.on('connected', () => {
  console.log('MongoDB Connected');
});

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.locals.formatData = (data) => {
  return dayjs(data).format('YYYY-MM-DD::mm:ss');
}

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser);
app.use(express.static(path.join(__dirname, 'public')));

// express-session 세션 관리
app.use(
  session({
    secret: 'elice',
    resave: false,
    saveUninitialized: true,
  }),
);

// passport 초기화 및 세션 사용
app.use(passport.initialize());
app.use(passport.session());


app.use('/', indexRouter);
app.use('/posts', loginRequired, postsRouter);
app.use('/auth', authRouter);


app.use((req, res, next) => {
  next(createError(404));
});
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'devlopment' ? err:{};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;