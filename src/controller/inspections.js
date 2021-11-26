/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable arrow-body-style */
// display all users
exports.index = (req, res) =>
  // eslint-disable-next-line implicit-arrow-linebreak
  res.status(200).json([
    {
      _id: '1234',
      userId: '4321',
      propertyId:'2345',
      preferredDate:'dateTest'
    },
  ]);

// update one user
exports.update = (req, res) =>
  res.status(200).json({
    _id: '1234',
    userId: '4321',
    propertyId:'2345',
    preferredDate:'dateTest'
  });
// delete one user
exports.destroy = (req, res) => res.status(204);

// create one user and return the created object
exports.store = (req, res) =>
  res.status(200).json({
    _id: '1234',
    userId: '4321',
    propertyId:'2345',
    preferredDate:'dateTest'
  });

// display one user
exports.show = (req, res) =>
  // eslint-disable-next-line implicit-arrow-linebreak
  res.status(200).json({
    _id: '1234',
    userId: '4321',
    propertyId:'2345',
    preferredDate:'dateTest'
  });
