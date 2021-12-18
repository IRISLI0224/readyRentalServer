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

/**
 * 69 - Search property at home page
 * dafault: get all properties
 * search (input): streetName, city, state, postCode
 * numOfBed (droplist): bed min, bad max
 * rent (droplist): rent min, rent max
 */
exports.searchProperties = async (req, res) => {
  // using req.query to get params
  // input: e.g hobart
  const { input, bedMin, bedMax, rentMin, rentMax } = req.query;
  const searchQuery = {};
  if (!!input) {
    const inputReg = new RegExp(input, 'i');
    console.log(inputReg);
    searchQuery.$or = [];
    searchQuery.$or.push({ 'address.streetName': { $regex: inputReg } });
    searchQuery.$or.push({ 'address.city': { $regex: inputReg } });
    searchQuery.$or.push({ 'address.state': { $regex: inputReg } });
    if (!isNaN(input)) {
      searchQuery.$or.push({ 'address.postCode': input });
    }
  }
  if (!!bedMin) {
    if (searchQuery.numOfBed == undefined) {
      searchQuery.numOfBed = {};
    }
    searchQuery.numOfBed.$gte = Number(bedMin);
  }
  if (!!bedMax) {
    if (searchQuery.numOfBed == undefined) {
      searchQuery.numOfBed = {};
    }
    searchQuery.numOfBed.$lte = Number(bedMax);
  }
  if (!!rentMin) {
    if (searchQuery.rent == undefined) {
      searchQuery.rent = {};
    }
    searchQuery.rent.$gte = Number(rentMin);
  }
  if (!!rentMax) {
    if (searchQuery.rent == undefined) {
      searchQuery.rent = {};
    }
    searchQuery.rent.$lte = Number(rentMax);
  }
  const properties = await Property.find(searchQuery);
  // res.writeHead(200);
  res.json(properties);
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