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
    required: false,
  },
});

// TODO: add code to ensure the uniqueness of the inspection, this way doesn't work
// Jack Zhu: creating index is only for better searching performance (speed)
 inspectionSchema.index({ user: 1, property: 1 });

const Inspection = mongoose.model('Inspection', inspectionSchema);

module.exports = Inspection;
