const jwt = require("jsonwebtoken");
require('dotenv').config();

exports.auth = async (req, res, next) => {
  try {
  console.log("auth create comm:", req.headers)
  const token = req.headers.authorization.split(' ')[1];
  let decodedData= jwt.verify(token, process.env.SECRET);
  req.userId = decodedData?.id;
  next();
  } catch (error) {
    console.log(error);
  }
};
