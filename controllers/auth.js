const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { User } = require("../models/user");
const { HttpError, ctrlWrapper } = require("../helpers");


const { SECRET_KEY } = process.env;

require("dotenv").config();

// --------------- signup ----------------------------------------//
const signup = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email in use");
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({ ...req.body, password: hashPassword });

  res.status(201).json({ email: newUser.email, password: newUser.password });
};
// ------------------------login---------------------------------//
const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(409, "Email or password is wrong");
  }
  const payload = {
    id: user._id,
  };


  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "24h" });

  await User.findByIdAndUpdate(user._id, { token });

  res.status(200).json({
    token: token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};
// -----------------------loguot---------------------------------//
const logout = async (req,res,)=>{
  const {_id} = req.user;
const user = await User.findByIdAndUpdate(_id, { token: null });
if (!user) {
  HttpError(401, "Not authorized");
}
res.status(204).json({
  message: "No Content",
});
};
// -------------------------- current -----------------------------//
const current = async (req, res) => {
  const { email, subscription } = req.user;
  res.status(201).json({
    email,
    subscription,
  });
};
// -----------------------updateUser--------------------------------//
const updateUser = async (req, res) => {
  const { _id } = req.user;
  console.log(_id);
  console.log(req.body);

  const { subscription } = req.body;
  if (!subscription) {
    res.status(400).json({ message: 'missing field favorite' });
  }

  const result = await User.findByIdAndUpdate(_id, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404, 'Not found');
  }
  res.status(200).json(result);
};
module.exports = {
  signup: ctrlWrapper(signup),
  login: ctrlWrapper(login),
  logout: ctrlWrapper(logout),
  current: ctrlWrapper(current),
  updateUser: ctrlWrapper(updateUser),
};