import jwt from "jsonwebtoken";

const secret = 'aa@#A1';

const auth = async (req, res, next) => {
  try {
  console.log("auth create comm:", req.headers)
  const token = req.headers.authorization.split(' ')[1];
  let decodedData= jwt.verify(token, secret);
  req.userId = decodedData?.id;
  next();
  } catch (error) {
    console.log(error);
  }
};

export default auth;