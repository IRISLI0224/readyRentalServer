const User = require('../model/user');


// display all users 
exports.index = async (req, res) => {
    // eslint-disable-next-line implicit-arrow-linebreak
    const users = await User.find().exec();
    res.status(200).json(users);
  };

// update one user by ID
exports.update = async(req, res) => {
    const {id} =req.params;
    const {
        email,
        password,
    }= req.body;

    const user= await User.findByIdAndUpdate(id,
        {email,
        password},
        {new:true},
    ).exec();

    if (!user) res.status(404).send('user not found');
    res.status(200).json(user);
};

// get one user by ID
exports.show = async (req, res) => {
    // eslint-disable-next-line implicit-arrow-linebreak
    const { id } = req.params;
    const user = await User.findById(id).exec();
  
    if (!user) res.status(404).send('user not found');
    res.status(200).json(user);
  };

// delete one user by ID
exports.destroy = async (req, res) => {
    const {id} =req.params;
    const user = User.findByIdAndDelete(id).exec();
    if (!user) res.status(404).send('user not found');
    res.status(200).json("user deleted");
};