
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
  // users.findOne({ email: req.body.email }) (mongodb)
  const existingUser = users.find((u) => u.email === req.body.email);
  if (existingUser) return res.status(400).send('Email already exists');
  //写model文件夹里 变成函数
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
    //jwt token 生成

  const token = generateAccessToken(req.body)
  const newUser = {
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
    token: token,
  };
  // const token = generateAccessToken(newUser);
  // newUser = [...newUser, token];

  try {
    users.push(newUser);
    res.status(201).send(newUser);
    //邮箱验证
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
  const existingUser = users.find((u) => u.email === req.body.email);
  if (!existingUser) {
    return res.status(401).send('Email does not exist');
  }
  // 变成函数
  const validPass = await bcrypt.compare(req.body.password, existingUser.password);
  if (!validPass) return res.status(401).send('Invalid password');

  const token = generateAccessToken(existingUser);
  const loginUser = {...existingUser, token};

  res.status(200).json(loginUser);
};
// delete one user//完成
exports.destroy = (req, res) => {
  //id mongodb 
  if (users.id === req.params.id) {
    res.status(204).json('user has been deleted');
  } else {
    res.status(404).json('You are not allowed to delete this user!');
  }
};
