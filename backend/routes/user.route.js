import express from 'express';
import { registerUser,loginUser, getProfile, updateProfile, bookAppointment, listAppointment, cancelAppointment,paymentrazorpay, verifyRazorpay } 
from '../controllers/user.controller.js';
import authUser from '../middlewares/authUser.js';
import upload from '../middlewares/multer.js';



const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.get('/get-profile',authUser,getProfile);
userRouter.post('/update-profile',upload.single('image'),authUser,updateProfile)
userRouter.post('/book-appointment',authUser,bookAppointment)
userRouter.get('/appointment',authUser,listAppointment)
userRouter.post('/cancel-appointment',authUser,cancelAppointment)
userRouter.post('/payment-razorpay',authUser,paymentrazorpay);
userRouter.post('/verify-razorpay',authUser,verifyRazorpay);
export default userRouter;