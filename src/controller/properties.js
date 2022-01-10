const Property = require('../model/property');
const User = require('../model/user');

// create one property and return the created object
exports.store = async (req, res) => {
  const {
    streetNumber,
    streetName,
    city,
    state,
    postCode,
    numOfBath,
    numOfBed,
    numOfCarSpace,
    smokingAllowed,
    roomType,
    rent,
    postDate,
    petAllowed,
    furnished,
    airCon,
    intercom,
    description,
    availableDate,
    propImage
  } = req.body;

  const property = new Property({
    address: { streetNumber, streetName, city, state, postCode },
    numOfBath,
    numOfBed,
    numOfCarSpace,
    smokingAllowed,
    roomType,
    rent,
    postDate,
    petAllowed,
    furnished,
    airCon,
    intercom,
    description,
    availableDate,
    propImage
  });

  try {
    await property.save();
    const user = await findUserFromDB(req, res);


    //add property to user
    user.properties.addToSet(property._id);

    //add user to the property
    property.user = user._id;

    await user.save();
    await property.save();

    res.status(201).json(property);
  } catch (error) {
    return res.status(404).json(error);
  }
};

/**
 * 69 - Search property at home page
 * default: get all properties
 * search (input): streetName, city, state, postCode
 * numOfBed (droplist): bed min, bad max
 * rent (droplist): rent min, rent max
 */

/**
 * 124 - Search bar filter through property type
 */
exports.index = async (req, res) => {
  // using req.query to get params
  // input: e.g hobart
  const { input, bedMin, bedMax, rentMin, rentMax, type } = req.query;
  const searchQuery = {};
  if (!!input) {
    const inputReg = new RegExp(input, 'i');
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
  if (!!type) {
    searchQuery.roomType = type;
  }
  const properties = await Property.find(searchQuery);
  res.json(properties);
};

// update one property, override the old data?
exports.update = async (req, res) => {
  const { id } = req.params;
  const {
    streetNumber,
    streetName,
    city,
    state,
    postCode,
    numOfBath,
    numOfBed,
    numOfCarSpace,
    smokingAllowed,
    roomType,
    rent,
    postDate,
    petAllowed,
    furnished,
    airCon,
    intercom,
    description,
    availableDate,
    propImage
  } = req.body;

  const newProperty = await Property.findByIdAndUpdate(
    id,
    {
      address: { streetNumber, streetName, city, state, postCode },
      numOfBath,
      numOfBed,
      numOfCarSpace,
      smokingAllowed,
      roomType,
      rent,
      postDate,
      petAllowed,
      furnished,
      airCon,
      intercom,
      description,
      availableDate,
      propImage
    },
    { new: true }, //return the updated property
  ).exec();

  if (!newProperty) res.status().send('property not found');
  res.status(200).json(newProperty);
};

// delete one property
exports.destroy = async (req, res) => {
  const { id } = req.params;
  const property = await Property.findByIdAndDelete(id).exec();
  if (!property) res.status(404).send('property not found');

  //remove the property from user
  try {
    const user = await findUserFromDB(req, res);
    user.properties.pull(property._id);
    await user.save();
    res.sendStatus(204);
  } catch (error) {
    return res.status(404).json({ error: 'cannot find user' });
  }
};

// display one property
exports.show = async (req, res) => {
  // eslint-disable-next-line implicit-arrow-linebreak
  const { id } = req.params;
  const property = await Property.findById(id).populate('user').exec();

  if (!property) res.status(404).send('property not found');
  res.status(200).json(property);
};

// check if user from token exists in database
const findUserFromDB = async (req, res) => {
  // get user from tokenAuth that puts user in req.user
  const userReq = req.user.user;
  const user = await User.findById(userReq._id).exec();
  if (!user) {
    throw 'cannot found user';
  }
  return user;
};
