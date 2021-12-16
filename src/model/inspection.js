const mongoose = require('mongoose');

const inspectionSchema = new mongoose.Schema({
  //for test purpose, comment out the userId currently
  //     userId: {
  //     type: mongoose.Schema.Types.ObjectId,
  //     required: true,
  //     unique: true,
  //   },
    userId:{
        type:Number,
        required:true,
    },
    propertyId:{
        type:Number,
        required:true,
    },
    preferredDate:{
        type:String,
        //TODO:change this type to Date after figuring out
        //how to format date.
        required:true,
    }
});

//TODO: add code to ensure the uniqueness of the inspection.
const Inspection= mongoose.model('inspection', inspectionSchema);

module.exports = Inspection;
