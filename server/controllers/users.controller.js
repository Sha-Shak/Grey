import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Users from '../models/user.model.js';
export const logInUser = async (req,res)=>{
  try{
    const {email, password} = req.body;
    const result = await Users.findOne({email});
    if(!result) return res.status(404).send("User doesn't exist");
    const isPassword =  await bcrypt.compare(password, result.password)
    if (!isPassword) return res.status(400).json({message: "JSON Wrong Password"})
    const token = jwt.sign({email: result.email, id: result._id}, "aa@#A1", {expiresIn: "1hr"})
    res.status(200).json({email: result.email, result , token})
  }catch(e){
    res.status(500).json({message: "something went wrong"})
  }
}
export const createUser = async (req,res)=>{
  try{
    const {firstName, lastName, email, password, confirmPassword} = req.body;
    console.log("check",{firstName, lastName, email, password, confirmPassword})
    try{
    const existingUser = await Users.findOne({email});
    if(existingUser) return res.status(400).send("User already exists");
    if (password !== confirmPassword) return res.status(400).json({message: "Passwords don't match!"})
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await Users.create({email, password: hashedPassword, name: `${firstName} ${lastName}`});
    const token = jwt.sign({email: result.email, id: result._id, password: result.password }, "aa@#A1", {expiresIn: "1hr"});
    res.status(201).json({result, token});
    }catch(e){
       res.status(500).json({message: "something went wrong"})
    }
  } catch(e){
    res.status(500);
    console.log(e)
  }
}

