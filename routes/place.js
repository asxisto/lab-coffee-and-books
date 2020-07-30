'use strict';

const { Router } = require('express');
const router = new Router();
const Place = require('./../models/place');

router.get('/create', (req, res, next) => {
  res.render('place/create');
});

router.post('/create', (req, res, next) => {
  const { name, type, latitude, longitude } = req.body;

  Place.create({
    name,
    location: {
      type,
      coordinates: [longitude, latitude]
    }
  })
    .then(place => {
      res.redirect('/');
    })
    .catch(error => {
      next(error);
    });
});

const metersToDegrees = meters => (meters / 1000 / 40000) * 360;

router.get('/search', (req, res, next) => {
  const latitude = req.query.latitude;
  const longitude = req.query.longitude;
  const radius = req.query.radius;

  Place.find()
    .where('location')
    .within()
    .circle({ center: [longitude, latitude], radius: metersToDegrees(radius) })
    .then(places => {
      res.render('place/results', { places });
    })
    .catch(error => {
      next(error);
    });
});

router.get('/place/:id', (req, res, next) => {
  console.log(req.body);
  const id = req.params.id;
  Place.findById(id)
    .then(place => {
      res.render('place/single', { place });
    })
    .catch(error => {
      next(error);
    });
});

router.get('/place/:id/edit', (req, res, next) => {
  const id = req.params.id;
  // console.log(req.body);
  Place.findById(id)
    .then(place => {
      res.render('place/edit', { place });
    })
    .catch(error => {
      next(error);
    });
});

router.post('/place/:id/edit', (req, res, next) => {
  const id = req.params.id;
  console.log(req.body);
  const { name, type, latitude, longitude } = req.body;
  //const placeType = req.body.place.location.type;
  // const name = req.body.place.name;
  // const type = req.body.place.location.type;

  Place.findByIdAndUpdate(id, { name, type, latitude, longitude })
    .then(() => {
      res.redirect(`/place/${id}`);
    })
    .catch(error => {
      next(error);
    });
});

router.get('/place/:id/delete', (req, res, next) => {
  const id = req.params.id;

  Place.findByIdAndDelete(id)
    .then(place => {
      res.redirect('/');
    })
    .catch(error => {
      next(error);
    });
});

module.exports = router;
