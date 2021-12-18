const mongoose = require('mongoose');

const inspectionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },

  property: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Property',
  },
  preferredDate: {
    type: Date,
    required: true,
  },
});

//TODO: add code to ensure the uniqueness of the inspection.
inspectionSchema.index({ user: 1, property: 1 }, { unique: true });

const Inspection = mongoose.model('Inspection', inspectionSchema);

module.exports = Inspection;
