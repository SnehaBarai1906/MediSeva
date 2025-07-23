import express from 'express';
import cors from 'cors';
import 'dotenv/config';

import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js'; 
import adminRouter from './routes/admin.route.js';
import doctorRouter from './routes/doctor.route.js';
import userRouter from './routes/user.route.js';
const app=express()
const port=process.env.PORT || 4000
connectDB()
connectCloudinary()
//middleware
app.use(cors())
app.use(express.json())

//api endpoints
app.use('/api/admin',adminRouter);
//localhost:4000/api/admin/add-doctor
app.use('/api/doctor', doctorRouter);
app.use('/api/user', userRouter);


app.get('/', (req, res) => {
  res.send('Welcome to the Seva API')
});   

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});