const Property = require('../model/property');
const User = require('../model/user');
const { splitAddr, handleGoogleAddr } = require('../utils/inputSplit');

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
    propImage,
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
    propImage,
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

    return res.status(201).json(property);
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
 *
 * 124 - Search bar filter through property type
 *
 * 154 - Improve Search function at home page,
 * so that it can search city and state together
 *
 * 156 - Search bar can do the whole address (via Google auto-completion) search at home page
 */

exports.index = async (req, res) => {
  // using req.query to get params
  // input: e.g hobart
  const { input, bedMin, bedMax, rentMin, rentMax, type } = req.query;
  const searchQuery = {};

  if (!!input) {
    const splitInput = splitAddr(input);

    // do nothing if input.length === 0
    if (splitInput.length === 1) {
      // in this case, treat it as the whole ONE word query for now.
      searchQuery.$or = [];
      const inputReg = new RegExp(input, 'i');
      searchQuery.$or.push({ 'address.streetName': { $regex: inputReg } });
      searchQuery.$or.push({ 'address.city': { $regex: inputReg } });
      searchQuery.$or.push({ 'address.state': { $regex: inputReg } });
      if (!isNaN(input)) {
        searchQuery.$or.push({ 'address.postCode': input });
      }
    } else if (splitInput.length === 2 && splitInput[1].trim().split(' ').length === 1) {
      // length > 1. There will be 2 conditions
      // 1) supports 'city' and 'state' search query - "city state", "state city", "city, state", "state, city", with only EXACT words
      searchQuery.$or = [];
      searchQuery.$or.push({ 'address.city': splitInput[0], 'address.state': splitInput[1] });
      searchQuery.$or.push({ 'address.city': splitInput[1], 'address.state': splitInput[0] });
    } else {
      // splitInput.length > 2 || splitInput[1].trim().split(' ').length > 1
      // 2) resolve and split the string from google auto-completion
      const res = handleGoogleAddr(input);
      // 'res' may have 3 OR 4 elements
      if (res.length === 3) {
        // streetName, city, state
        const streetNameReg = new RegExp(res[0], 'i');
        searchQuery['address.streetName'] = {};
        searchQuery['address.streetName'].$regex = streetNameReg;
        searchQuery['address.city'] = res[1];
        searchQuery['address.state'] = res[2];
      } else if (res.length === 4) {
        searchQuery['address.streetNumber'] = res[0];

        const streetNameReg = new RegExp(res[1], 'i');
        console.log('streetNameReg:', streetNameReg);
        searchQuery['address.streetName'] = {};
        searchQuery['address.streetName'].$regex = streetNameReg;
        
        searchQuery['address.city'] = res[2];
        searchQuery['address.state'] = res[3];
      }
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
  const properties = await Property.find(searchQuery).exec();
  return res.status(200).json(properties);
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
    propImage,
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
      propImage,
    },
    { new: true }, //return the updated property
  ).exec();

  if (!newProperty) res.status(404).json({ error: 'property not found' });
  return res.status(200).json(newProperty);
};

// delete one property
exports.destroy = async (req, res) => {
  const { id } = req.params;
  const property = await Property.findByIdAndDelete(id).exec();
  if (!property) res.status(404).json({ error: 'property not found' });

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

  if (!property) return res.status(404).json({ error: 'property not found' });
  return res.status(200).json(property);
};

// display random property
exports.ads = async (req, res) => {
  // eslint-disable-next-line implicit-arrow-linebreak
  const total = await Property.countDocuments();
  const skip = Math.floor(Math.random() * total) ;
  const property = await Property.findOne({}).skip(skip).exec()
  //if (!property) res.status(404).send('property not found');
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
