const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    location: {
      coordinates: [
        {
          type: Number,
          min: -180,
          max: 180
        }
      ],
      type: {
        type: String,
        enum: ['Coffee Shop', 'Bookstore']
      }
    }
  },
  {
    timestamps: true
  }
);

const Place = mongoose.model('Place', placeSchema);

module.exports = Place;
