const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  address: {
    streetNumber: {
      type: Number,
      required: true,
    },
    streetName: {
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
  smokingAllowed: {
    type: Boolean,
    required: false,
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
    required: false,
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    default: 'open',
  },
  availableDate: {
    type: Date,
    required: false,
  },
  propImage: [
    {
      type: String,
      required: false,
    },
  ],
});

propertySchema.index({ address: 1 }, { unique: true });
const Property = mongoose.model('Property', propertySchema);

module.exports = Property;
