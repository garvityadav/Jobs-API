const { BadRequestError } = require("../errors");
const UserModel = require("../models/User.js");
const { StatusCodes } = require("http-status-codes");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const user = await UserModel.create({ ...req.body });
  const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({
    id: user.id,
    email: user.email,
    username: user.username,
    password: user.password,
    token,
  });
};

//Login
const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("please provide email or password");
  }
  const user = await UserModel.findOne({ email, isDeleted: false }).select("-isDeleted");
  if (user) {
    const compare = await user.comparePassword(password);
    if (compare) {
      const token = user.createJWT();
      res.status(StatusCodes.OK).json({ user, token });
    } else {
      res.status(StatusCodes.UNAUTHORIZED).send("Invalid Credentials");
    }
  } else {
    res.status(StatusCodes.UNAUTHORIZED).send("Invalid Credentials");
  }
};


// export
module.exports = { login, register};
