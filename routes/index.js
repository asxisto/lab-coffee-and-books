'use strict';

const { Router } = require('express');
const router = new Router();

const Place = require('./../models/place');

router.get('/', (req, res, next) => {
  Place.find()
    .then(places => {
      res.render('index', { places });
    })
    .catch(error => {
      next(error);
    });
});

module.exports = router;
