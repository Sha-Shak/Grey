const jwt = require("jsonwebtoken");
const secret = 'aa@#A1';

exports.createAuth = async (req, res, next) => {
  try {
  if(req.headers.authorization){
    const token = req.headers.authorization.split(' ')[1];
    let decodedData= jwt.verify(token, secret);
    req.anonId = decodedData?.id;
  }
  next();
  } catch (error) {
    console.log(error);
  }
};
