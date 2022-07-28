import bodyParser from "body-parser";
import cors from "cors";
import { default as express, default as Router } from "express";
import mongoose from 'mongoose';
const { Schema, model } = mongoose;
const app = express();
const router = Router();


// middleware function call 
app.use(express.json());
// might not need 
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
// cors for connecting backend with frontend
app.use(router);
app.use(cors());

//model
const UserSchema = new Schema({
  name: { type: String, required: true },
  dob: Date,
  address: String,
  email: { type: String, required: true },
  gender: {
    type: String,
    enum : ['MALE','FEMALE', 'OTHER'],
    default: 'OTHER'
  }

}, {timestamps: true})

const RaUser = model('RaUser', UserSchema)

//controllers
const getUsers = async(req, res)=>{
  try{
    const user = await RaUser.find();
    res.status(200);
    res.send(user)
  }catch(e){
    console.log(e);
  }
}

const postUser = async(req, res)=>{
  try{
  const {name, dob, address, email, gender } = req.body;
  const user = await RaUser.create({name, dob, address, email, gender });
  res.status(201);
  res.send(user);
  } catch(e){
    console.log(e);
  }
}
const deleteUser = async (req,res)=>{
  try{
    const id= req.params.id;
    const result = await RaUser.findByIdAndDelete(id)
    res.status(201)
    res.send(result)
  }catch(e){
    console.log(e);
  }
}
const updateUser = async (req, res) => {
  const id = req.params.id
  const {name, dob, address, email, gender } = req.body
  const user = await RaUser.findById(id).orFail(); //orFail (if user doesn't exist will throw an error)
  user.name = name
  user.dob = dob
  user.address = address
  user.email = email
  user.gender = gender;
  await user.save(user)
  res.json(user)
}


// end points
router.get('/get-users', getUsers);
router.post('/create-user', postUser);
router.delete('/delete-user/:id', deleteUser);
router.put('/update-user/:id', updateUser)




// Database and backend server
const url = 'mongodb+srv://mern:1234@cluster0.6dfpl66.mongodb.net/?retryWrites=true&w=majority';
const PORT = 8080;
(
    async function bootstrap() {
      try {
        await mongoose.connect(url)
        console.log('Mongoose connected.')
        app.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}`)
        })
      } catch (error) {
        console.log(error)
      }
    }
  )()
