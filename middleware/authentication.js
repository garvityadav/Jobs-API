require("dotenv").config();
const jwt = require("jsonwebtoken");
const { UnauthenticatedError } = require("../errors");
const tokenValidate = async (req, res, next) => {
  let token = req.headers.authorization;
  if (!token || !token.startsWith("Bearer ")) {
    throw new UnauthenticatedError("Invalid Token");
  }

  token = token.split(" ")[1];
  const validate = await jwt.verify(token, process.env.JWT_SECRET);
  req.user =validate;
  next();
};

module.exports = tokenValidate;
