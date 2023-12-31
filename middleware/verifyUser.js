const jwt = require("jsonwebtoken");
const createError = require("../utils/error");

const verifyUser = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    console.log(token)

    if (!token) {
      return next(createError(401, "You are not authenticated!"));
    }
    const user = jwt.verify(token, process.env.JWT);
    if (!user) {
      return next(createError(403, "Token is not valid!"));
    }
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = verifyUser;
