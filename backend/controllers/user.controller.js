import validator from 'validator';
import bcrypt from 'bcrypt';
import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import userModel from '../models/user.model.js';
import {v2 as cloudinary} from 'cloudinary'
import doctorModel from '../models/doctor.model.js';
import appointmentModel from '../models/appointment.model.js'
import razorpay from 'razorpay'

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


//api to book appointment

const bookAppointment= async(req,res)=>{
  try {
    const userId = req.userId;
    const {docId,slotDate,slotTime} =req.body
    const docData= await doctorModel.findById(docId).select('-password')
    if(!docData.available){
      return res.json({success:false,message:'doctor is not available'})

    }
    let slots_booked=docData.slots_booked
    //checking forslots avaibility

    if(slots_booked[slotDate]){
      if(slots_booked[slotDate].includes(slotTime)){
        return res.json({success:false,message:'Slot is not available'})
      }
      else{
        slots_booked[slotDate].push(slotTime)
      }
    }else{
      slots_booked[slotDate]=[]
      slots_booked[slotDate].push(slotTime)
    }

    const userData= await userModel.findById(userId).select('-password')

    delete docData.slots_booked

    const appointmentData={
      userId,
      docId,
      userData,
      docData,
      amount:docData.fees,
      slotTime,
      slotDate,
      date:Date.now()
    }

    const newAppointment = new appointmentModel(appointmentData)
    await newAppointment.save()

    //save new slots data into doctor data
    await doctorModel.findByIdAndUpdate(docId,{slots_booked})

    res.json({success:true,message:'Appointment Booked'})
    
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

//api to get user appointment for frontend my appointement page
const listAppointment=async(req,res)=>{
  try {

    const userId = req.userId;
    const appointments=await appointmentModel.find({userId})

    res.json({success:true,appointments})
    
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

//api to cancel appointment

const cancelAppointment=async(req,res)=>{
  try {
   const userId = req.userId;
    const { appointmentId } = req.body;

    const appointmentData=await appointmentModel.findById(appointmentId)
    if (appointmentData.userId.toString() !== userId) {
      return res.json({ success: false, message: "Unauthorized action" });
    }


    await appointmentModel.findByIdAndUpdate(appointmentId,{cancelled:true})
    //releasing doctor slot

    const {docId,slotDate,slotTime}=appointmentData
    const doctorData=await doctorModel.findById(docId)

    let slots_booked=doctorData.slots_booked
    slots_booked[slotDate]=slots_booked[slotDate].filter(e=>e!==slotTime)
    await doctorModel.findByIdAndUpdate(docId,{slots_booked})
    res.json({success:true,message:"Appointment cancelled"})
    
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

//api to make payment of appointmengt using razorpay
const razorpayInstance=new razorpay({
  key_id:process.env.RAZORPAY_KEY_ID,
  key_secret:process.env.RAZORPAY_KEY_SECRET
})
const paymentrazorpay = async(req,res)=>{
  try {
    const {appointmentId} = req.body;
  const appointmentData = await appointmentModel.findById(appointmentId);
  if (!appointmentData || appointmentData.cancelled) {
    return res.status(404).json({ success: false, message: "Appointment cancelled or not found" });
  }
  //creating options for razorpay payment
  const options = {
    amount: appointmentData.amount * 100, // amount in smallest currency unit
    currency: process.env.CURRENCY,
    receipt: appointmentId,
  };
  //creating order in razorpay
  const order = await razorpayInstance.orders.create(options);
  res.json({success: true,order });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
  
}

export { registerUser,loginUser,getProfile ,
  updateProfile,bookAppointment,listAppointment,
  cancelAppointment,paymentrazorpay };