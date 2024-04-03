const { Router } = require('express');
const asyncHandler = require('../utils/async-handler');
const hashPassword = require('../utils/hash-password');
const { User } = require('../models');
const router = Router();

router.get('/', (req, res) => {
  if (req.user) {
    res.redirect('/posts');
    return;
  }
  res.redirect('/login');
  
});

router.get('/login', (req, res, next) => {
  res.render('user/login');
});

router.get('/join', (req, res, next) => {
  res.render('user/join');
});

router.get('/', (req, res, nex) => {
  res.render('user/join');
});

router.post('join', asyncHandler(async(req, res) => {
  const {email, name, password} = req.body;
  const hashedPassword = hashPassword(password);
  const user = await User.create({
    email,
    name,
    password: hashedPassword,
  });

  console.log('신규회원', user);

  res.redirect('/');
  }),
);

module.exports = router;
