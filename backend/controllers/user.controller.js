import validator from 'validator';
import bcrypt from 'bcrypt';
import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import userModel from '../models/user.model.js';
import {v2 as cloudinary} from 'cloudinary'
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

//api to get user profile

const getProfile = async (req,res)=>{
  try{
    const userId = req.userId;

    const userData=await userModel.findById(userId).select('-password')
    res.json({success:true,userData})
  }catch(err){
    console.error(err);
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
}


const updateProfile = async (req, res) => {
  try {
    const userId = req.userId; // ✅ from auth middleware
    const { name, phone, address, dob, gender } = req.body;
    const imageFile = req.file; // ✅ from multer

    if (!name || !phone || !dob || !gender) {
      return res.json({ success: false, message: "Missing required fields" });
    }

    const updateFields = {
      name,
      phone,
      dob: new Date(dob),
      gender,
      address: JSON.parse(address),
    };

    if (imageFile) {
      const uploadResult = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image",
      });
      updateFields.image = uploadResult.secure_url;
    }

    await userModel.findByIdAndUpdate(userId, updateFields);

    res.json({ success: true, message: "Profile updated successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export { registerUser,loginUser,getProfile ,updateProfile};