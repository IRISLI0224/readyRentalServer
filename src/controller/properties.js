/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable arrow-body-style */
// display all users
exports.index = (req, res) =>
  // eslint-disable-next-line implicit-arrow-linebreak
  res.status(200).json([
    {
      _id: '13werssfdafasd',
      userId: '122dfgs',
      roomNumber: 12,
      street: 'gunn',
      city: 'Hobart',
      state: 'Tas',
      postCode: 3455,
      numOfBed: 2,
      numOfBath: 2,
      numOfCarSpace: 2,
      roomType: 'house',
      rent: 1288,
      postDate: '12-11-2014',
      petAllowed: true,
      furnished: true,
      airCon: true,
      intercom: true,
      description: 'perfect house for you',
    },
  ]);

// update one user
exports.update = (req, res) =>
  res.status(200).json({
    _id: '13werssfdafasd',
    userId: '122dfgs',
    roomNumber: 12,
    street: 'gunn',
    city: 'Hobart',
    state: 'Tas',
    postCode: 3455,
    numOfBed: 2,
    numOfBath: 2,
    numOfCarSpace: 2,
    roomType: 'house',
    rent: 1288,
    postDate: '12-11-2014',
    petAllowed: true,
    furnished: true,
    airCon: true,
    intercom: true,
    description: 'perfect house for you',
  });
// delete one user
exports.destroy = (req, res) => res.status(204);

// create one user and return the created object
exports.store = (req, res) =>
  res.status(200).json({
    _id: '13werssfdafasd',
    userId: '122dfgs',
    roomNumber: 12,
    street: 'gunn',
    city: 'Hobart',
    state: 'Tas',
    postCode: 3455,
    numOfBed: 2,
    numOfBath: 2,
    numOfCarSpace: 2,
    roomType: 'house',
    rent: 1288,
    postDate: '12-11-2014',
    petAllowed: true,
    furnished: true,
    airCon: true,
    intercom: true,
    description: 'perfect house for you',
  });

// display one user
exports.show = (req, res) =>
  // eslint-disable-next-line implicit-arrow-linebreak
  res.status(200).json({
    _id: '13werssfdafasd',
    userId: '122dfgs',
    roomNumber: 12,
    street: 'gunn',
    city: 'Hobart',
    state: 'Tas',
    postCode: 3455,
    numOfBed: 2,
    numOfBath: 2,
    numOfCarSpace: 2,
    roomType: 'house',
    rent: 1288,
    postDate: '12-11-2014',
    petAllowed: true,
    furnished: true,
    airCon: true,
    intercom: true,
    description: 'perfect house for you',
  });
