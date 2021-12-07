/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable arrow-body-style */

const Property = require('../model/property');

// create one property and return the created object
exports.store = async (req, res) => {
  const {
    //get userId from token?
    // userId,
    streetNumber,
    street,
    city,
    state,
    postCode,
    numOfBath,
    numOfBed,
    numOfCarSpace,
    roomType,
    rent,
    postDate,
    petAllowed,
    furnished,
    airCon,
    intercom,
    description,
  } = req.body;

  const property = new Property({
    streetNumber,
    street,
    city,
    state,
    postCode,
    numOfBath,
    numOfBed,
    numOfCarSpace,
    roomType,
    rent,
    postDate,
    petAllowed,
    furnished,
    airCon,
    intercom,
    description,
  });

  await property.save();
  res.status(201).json(property);
};

// display all properties
exports.index = async (req, res) => {
  // eslint-disable-next-line implicit-arrow-linebreak
  const properties = await Property.find().exec();
  res.status(200).json(properties);
};

// update one property, overide the old data?
exports.update = async (req, res) => {
  const { id } = req.params;
  const {
    streetNumber,
    street,
    city,
    state,
    postCode,
    numOfBath,
    numOfBed,
    numOfCarSpace,
    roomType,
    rent,
    postDate,
    petAllowed,
    furnished,
    airCon,
    intercom,
    description,
  } = req.body;

  const newProperty = await Property.findByIdAndUpdate(
    id,
    {
      streetNumber,
      street,
      city,
      state,
      postCode,
      numOfBath,
      numOfBed,
      numOfCarSpace,
      roomType,
      rent,
      postDate,
      petAllowed,
      furnished,
      airCon,
      intercom,
      description,
    },
    { new: true }, //return the updated property
  ).exec();

  if (!newProperty) res.status().send('property not found');
  res.status(200).json(newProperty);
};
// delete one property
exports.destroy = async (req, res) => {
  const { id } = req.params;
  const property = Property.findByIdAndDelete(id).exec();
  if (!property) res.status(404).send('property not found');
  res.status(204).send('property deteted');
};

// display one property
exports.show = async (req, res) => {
  // eslint-disable-next-line implicit-arrow-linebreak
  const { id } = req.params;
  const property = await Property.findById(id).exec();

  if (!property) res.status(404).send('property not found');
  res.status(200).json(property);
};
