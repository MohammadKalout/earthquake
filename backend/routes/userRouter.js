import express from "express";
import expressAsyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import { generateToken, refreshToken } from '../utils.js';
import bcrypt from "bcryptjs"

const userRouter = express.Router();
// define the routes
userRouter.post('/signin',
expressAsyncHandler(async(req,res) => {
    const user = await User.findOne({email : req.body.email});
    if(user){
        if(bcrypt.compareSync(req.body.password, user.password)){
            const refresh = refreshToken(user);
            res.send({
                _id : user._id,
                name : user.name,
                email : user.email,
                token : generateToken(user),
                rToken : refresh
            });
            return;
        }
       
    }
    res.status(401).send({message : "Invalid email or password"});
})
);




userRouter.post('/register', expressAsyncHandler(async(req,res) => {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(401).send({ message: "Email Already Taken" });
    }
  
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
    });
    const createdUser = await user.save();
  
    const refresh = refreshToken(createdUser);
    res.send({
        _id : createdUser._id,
        name : createdUser.name,
        email : createdUser.email,
        token : generateToken(createdUser),
        rToken : refresh
    });
  }));
  




export default userRouter;