import * as dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
dotenv.config();
import {Request, Response } from 'express';

declare global {
  namespace Express {
   export interface Request {
      userId: any;
      anonId: any
    }
  }
}




// const auth = async (req, res, next) => {
//   try {
//   const token: string = req.headers.authorization.split(' ')[1];
//   let decodedData= jwt.verify(token, process.env.SECRET);
//   console.log(req.userId)
//   req.userId= decodedData?.id;
//   next();
//   } catch (error) {
//     console.log(error);
//   }
// };

const auth = async (req: Request, res: Response, next) => {
  try {
  const token: string = req.headers.authorization.split(' ')[1];
  let decodedData= jwt.verify(token, process.env.SECRET);
  req.userId= decodedData?.id;
  next();
  } catch (error) {
    console.log(error);
  }
};


module.exports = auth