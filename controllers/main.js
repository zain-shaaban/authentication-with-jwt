require('dotenv').config();
const customError = require("../errors/custom-error");
const jwt = require("jsonwebtoken");

const id=23

const login = async (req, res) => {
  let { username, password } =req.body;
  if (!username || !password)
    throw new customError("We Can't Send Empty Values", 400);
  const token = jwt.sign({ id, username }, process.env.jwt_secret, {expiresIn: "30d",});
  res.status(200).json({msg:"user created",token})
};

const dashboard = async (req, res) => {
  console.log(req.user);
  const luckyNumber = Math.floor(Math.random() * 100);
  res.status(200).json({
  msg: `Hello, ${req.user.username}`,
  secret: `Here Is Your Authorized Data ,Your LucyNumber Is ${luckyNumber}`,
  });
};

module.exports = {
  login,
  dashboard,
};
