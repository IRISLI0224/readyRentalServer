// display all users
exports.index = (req, res) =>
  // eslint-disable-next-line implicit-arrow-linebreak
  res.status(200).json([
    {
        name: 'Jessie',
        email: 'jessie@gmail.com',
        password: 'abc1223',
      },
      {
        name: 'Yu',
        email: 'yu@gmail.com',
        Password: 'abc1224',
      },
  ]);

// update one user
exports.update = (req, res) => res.status(200).json('Failed');
// delete one user
exports.destroy = (req, res) => res.status(200).json('Failed');

// store one user
exports.store = (req, res) => res.status(200).json('Failed');

// display one user
exports.show = (req, res) => res.status(200).json('Failed');
