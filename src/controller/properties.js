/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable arrow-body-style */

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
  });

  await property.save();

  //add property to user
  try {
    const user = await findUserFromDB(req, res);

    user.properties.addToSet(property._id);
    property.user = user._id;

    await user.save();
    await property.save();

    res.status(201).json(property);
  } catch (error) {
    return res.status(404).json({ error });
  }
};

// display all properties
exports.index = async (req, res) => {
  // eslint-disable-next-line implicit-arrow-linebreak
  const properties = await Property.find().exec();
  res.status(200).json(properties);
};

// update one property, override the old data?
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
    console.log(user);
    res.sendStatus(204);
  } catch (error) {
    return res.status(404).json({ error });
  }
};

// display one property
exports.show = async (req, res) => {
  // eslint-disable-next-line implicit-arrow-linebreak
  const { id } = req.params;
  const property = await Property.findById(id).exec();

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
