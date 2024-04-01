const { Router } = require('express');
const { Post } = require('../models');

const router = Router();

router.get('/', async (req, res, next) => {
    if (req.query.write) {
        res.render('post/edit');
    }
})