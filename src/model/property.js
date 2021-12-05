const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  //for test purpose, comment out the userId currently
  //     userId: {
  //     type: mongoose.Schema.Types.ObjectId,
  //     required: true,
  //     unique: true,
  //   },

  streetNumber: {
    type: Number,
    required: true,
  },
  street: {
    //lowercase?
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },

  postCode: {
    type: Number,
    required: true,
  },
  numOfBed: {
    type: Number,
    required: true,
  },
  numOfBath: {
    type: Number,
    required: true,
  },
  numOfCarSpace: {
    type: Number,
    required: true,
  },
  roomType: {
    type: String,
    required: true,
  },
  rent: {
    type: Number,
    required: true,
  },
  postDate: {
    type: Date,
    default: Date.now,
  },
  petAllowed: {
    type: Boolean,
    required: true,
  },
  petAllowed: {
    type: Boolean,
    required: true,
  },
  furnished: {
    type: Boolean,
    required: true,
  },
  airCon: {
    type: Boolean,
    required: true,
  },
  intercom: {
    type: Boolean,
    required: true,
  },
  description: {
    type: String,
  },
});

const Property = mongoose.model('property', propertySchema);
module.exports = Property;
