// display all users 所有用户
exports.index = (req, res) => res.status(200).json('all users');

// update one user
exports.update = (req, res) => res.status(200).json('updated');

// display one user
exports.show = (req, res) => res.status(200).json('Failed');
