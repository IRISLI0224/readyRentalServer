const mongoose = require('mongoose');

const inspectionSchema = new mongoose.Schema({
  userId: {
    type: Number,
    required: true,
  },
  propertyId: {
    type: Number,
    required: true,
  },
  preferredDate: {
    type: String,
    //TODO:change this type to Date after figuring out
    //how to format date.
    required: true,
  },
});

//TODO: add code to ensure the uniqueness of the inspection.
const Inspection = mongoose.model('Inspection', inspectionSchema);

module.exports = Inspection;
