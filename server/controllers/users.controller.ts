const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
import {Request, Response } from 'express'
const Users = require('../models/user.model');


type QueryParams = {
  email: string, 
  password: string, 
  firstname: string, 
  lastname: string, 
  confirmPassword: string, 
  _id: string
}


export const logInUser = async (req: Request<QueryParams>,res: Response)=>{
  try{
    const {email, password}: {email: string; password: string} = req.body;
    const result = await Users.findOne({email});
    if(!result) return res.status(404).send(`User doesn't exist`);
    const isPassword: boolean =  await bcrypt.compare(password, result.password)
    if (!isPassword) return res.status(400).json({message: 'JSON Wrong Password'})
    const token:string = jwt.sign({email: result.email, id: result._id}, 'aa@#A1', {expiresIn: '1hr'})
    res.status(200).json({email: result.email, result , token})
  }catch(e){
    res.status(500).json({message: 'something went wrong'})
  }
}

export const createUser = async (req: Request<QueryParams>,res: Response)=>{
  try{
    const {firstName, lastName, email, password, confirmPassword}:{firstName:string, lastName:string, 
    email: string, password: string, confirmPassword: string}  = req.body;
    const existingUser = await Users.findOne({email});
    if(existingUser) return res.status(400).send('User already exists');
    if (password !== confirmPassword) return res.status(400).json({message: `Passwords don't match!`})
    const hashedPassword: string = await bcrypt.hash(password, 10);
    const result = await Users.create({email, password: hashedPassword, name: `${firstName} ${lastName}`});
    const token: string = jwt.sign({email: result.email, id: result._id, password: result.password }, 'aa@#A1', {expiresIn: '1hr'});
    res.status(201).json({result, token});
  } catch(e) {
      res.status(500).json({message: 'something went wrong'})
  }
}

