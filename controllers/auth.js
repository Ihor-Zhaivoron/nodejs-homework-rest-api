const { User } = require("../models/user");
const { HttpError, ctrlWrapper } = require("../helpers");
const bcrypt = require("bcrypt");
require("dotenv").config();

// --------------- signUp ----------------------------------------//
const signUp = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email already is use");
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({ ...req.body, password: hashPassword });

  res.status(201).json({ email: newUser.email, password:newUser.password });
};
// ------------------------login---------------------------------
module.exports = {
    signup: ctrlWrapper(signUp),
  }; 