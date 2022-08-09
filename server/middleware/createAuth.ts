import jwt from 'jsonwebtoken';

const secret: string = 'aa@#A1';

declare global {
  namespace Express {
   export interface Request {
      userId: any;
      anonId: any;
    }
  }
}

const createAuth = async (req, res, next) => {
  try {
    if(req.headers.authorization){
      const token:string = req.headers.authorization.split(' ')[1];
      console.log(token)
      let decodedData= jwt.verify(token, secret);
      req.anonId = decodedData?.id;
    }
    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = createAuth