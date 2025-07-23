import validator from 'validator';
import bcrypt from 'bcrypt';
import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import userModel from '../models/user.model.js';

//api to register a new user
const registerUser = async (req, res) => {
  try{
    const {name, email, password} = req.body;
    if(!name || !email || !password){
      return res.json({
        status: false,
        message:"Missing required fields"
      })
    }
    //validating email format
    if(!validator.isEmail(email)){
      return res.json({
        status: false,
        message:"Invalid email format"
      })
    }
    //validating password length
    if(password.length < 8){
      return res.json({
        status: false,
        message:"Password must be at least 8 characters long"
      })
    }
    // hasing the password
    const salt=await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userData = {
      name,
      email,
      password: hashedPassword
    };

    const newUser = await User.create(userData);
    const user=await newUser.save();

    const token=jwt.sign({id:user._id},process.env.JWT_SECRET,)
    res.json({success: true, token});

  }catch(err){
    console.error(err);
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
}

const loginUser = async (req, res) => {
  try {

    const {email,password}=req.body

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if(isMatch){
      const token=jwt.sign({id:user._id},process.env.JWT_SECRET)
      res.json({
        success: true,
        token,
      });
    }else{
      res.json({
        success: false,
        message: "Invalid credentials"
      });
    }

  }catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
}

export { registerUser,loginUser };