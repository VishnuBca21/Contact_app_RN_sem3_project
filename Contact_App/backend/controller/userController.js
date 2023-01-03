import {
  UserModel,
  userRegValidation,
  userLogValidation,
  userUpdateValidation
} from "../model/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const saltRounds = 10;

 const register = (req, res) => {
  const { error } = userRegValidation(req.body);
  if (error) return res.send({message:error.details[0].message});
  const { userName, phone, email, password } = req.body;

  UserModel.findOne({ userName }, (err, found) => {
    if (!err) {
      if (found) res.send({message:"User already registerd"});
      else {
        //***************** do the below dcrypt method ************
        bcrypt.hash(password, saltRounds, async (err, hash) => {
          let user = new UserModel({
            userName,
            phone,
            email,
            password: hash,
          });
          user = await user.save();
          const token = jwt.sign({ _id: user._id }, process.env.SECRET); // set the secret in .env
          res.send({token});
        });
      }
    } else res.send(err);
  });
};

 const login = (req, res) => {
  console.log(req.body)
  let { userName, password } = req.body;
  const { error } = userLogValidation(req.body);
  if (error) return res.send({message:error.details[0].message});

  UserModel.findOne({ userName }, async (err, found) => {
    if (!err) {
      if (found) {
        //*************** do the below dcrypt method ****************
        bcrypt.compare(password, found.password, (err, result) => {
          if (result) {
            // ************** send x-auth-token in header by jwt ************
            const token = jwt.sign({ _id: found._id }, process.env.SECRET); // set the secret in .env
            res.send({token});
          } else {
            res.send({message:"Opps! worng Password"});
          }
        });
      } else {
        res.send({message:"User Not registerd"});
      }
    } else res.send({err});
  });
};

 const updateUser = async (req, res) => {
    const { error } = userUpdateValidation(req.body);
    if (error) return res.status(400).send({message:error.details[0].message});
    let result = await UserModel.findOneAndUpdate({_id:req.user._id}, req.body, {new: true});   
    res.send({result:[result]});
};
  
const getUser = async (req,res)=>{
    const user = await UserModel.find({ _id: req.user._id}).select('-password')
    res.send(user)
}

export {register, login, updateUser, getUser}