
const bcrypt = require('bcrypt');
const { registerValidation, loginValidation } = require('./validation');
const { generateAccessToken } = require('./token');
// mock users
const users = [
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
];
// validation
// register-post // add useremail test
exports.register = async (req, res) => {
  const { error } = registerValidation(req.body); // validate the input
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  // users.findOne({ email: req.body.email })
  const emailExist = users.find((u) => u.email === req.body.email);
  if (emailExist) return res.status(400).send('Email already exists');
  //写model文件夹里 变成函数
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
    //jwt token 生成
  const token = generateAccessToken(newUser);
  const newUser = {
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
    token: token,
  };


  try {
    users.push(newUser);
    res.status(201).send(newUser);
  } catch (err) {
    res.status(500).send(err);
  }
};

// login-post// add password test
exports.login = async (req, res) => {
  // routes validation - 
  const { error } = loginValidation(req.body); // validate the input
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  // users.findOne({ email: req.body.email }) mongodb
  const emailExist = users.find((u) => u.email === req.body.email);
  if (!emailExist) {
    return res.status(401).send('Email does not exist');
  }
  // 变成函数
  const validPass = await bcrypt.compare(req.body.password, emailExist.password);
  if (!validPass) return res.status(401).send('Invalid password');

  const token = generateAccessToken(emailExist);
  res.status(200).json({
    // 连在一起 研究一下 - 未完成
    user: token,emailExist,});
};
// delete one user//完成
exports.destroy = (req, res) => {
  if (users.id === req.params.id) {
    res.status(204).json('user has been deleted');
  } else {
    res.status(404).json('You are not allowed to delete this user!');
  }
};
