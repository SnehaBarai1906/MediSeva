import validator from 'validator';
import bcrypt from 'bcrypt';
import {v2 as cloudinary} from 'cloudinary';
import doctorModel from '../models/doctor.model.js';
import jwt from 'jsonwebtoken';

//API for adding Doctor
const addDoctor = async (req, res) => {
  try {
    const { name, email,password,speciality,degree,experience,about,fees,address } = req.body;
    const imageFile = req.file;
    //checking for all data
    if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address ) {
      return res.status(400).json({success:false, message: 'Please fill all the fields' });
    }

    //validating email
    if(!validator.isEmail(email)){
      return res.status(400).json({success:false, message: 'Please enter a valid email' });
    }
    //validating strong password
    if(password.length < 8){
      return res.status(400).json({success:false, message: 'Password must be at least 8 characters long' });
    }

    //encrypting password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //uploading image to cloudinary
    const imageupload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type:"image"})
    const imageUrl = imageupload.secure_url;

    const doctorData = {
      name,
      email,
      password: hashedPassword,
      image: imageUrl,
      speciality,
      degree,
      experience,
      about,
      fees,
      address:JSON.parse(address),
      date: Date.now(),
      //available: true, // Assuming the doctor is available by default
    };

    //creating doctor
    const newDoctor = new doctorModel(doctorData);
    await newDoctor.save();

    res.status(201).json({success:true, message: 'Doctor added successfully' });
  } catch (error) {
  console.error('❌ Server Error:', error);  // Show full stack trace
  res.status(500).json({ message: 'Server error' });
}

}

//api for admin login

const loginAdmin = async (req, res) => {
  try { 
    const { email, password } = req.body;

    console.log("Login Request =>", email, password); 
    console.log("Expected =>", process.env.ADMIN_EMAIL, process.env.ADMIN_PASSWORD);

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required' });
    }

    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '2h' });

      return res.json({ success: true, message: 'Login successful', token });
    } else {
      return res.status(400).json({ success: false, message: 'Invalid email or password' });
    }
  }
  catch (error) {
    console.error('❌ Server Error:', error);  
    res.status(500).json({ message: 'Server error' });
  }
}

//api to get all doctors list for admin panel
const allDoctors = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select('-password'); // Exclude password from the response
    res.status(200).json({ success: true, doctors });
  }catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
}

export { addDoctor,loginAdmin ,allDoctors };