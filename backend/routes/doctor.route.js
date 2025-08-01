import express from 'express';
import { doctorlist, loginDoctor,appointmentsDoctor,appointmentCancel,appointmentComplete, doctorDashboard, updateDoctorProfile, doctorProfile } from '../controllers/doctor.controller.js';
import authDoctor from '../middlewares/authDoctor.js';

const doctorRouter = express.Router();


doctorRouter.get('/list', doctorlist)
doctorRouter.post('/login',loginDoctor)
doctorRouter.get('/appointments', authDoctor, appointmentsDoctor);
doctorRouter.post('/complete-appointment', authDoctor, appointmentComplete);
doctorRouter.post('/cancel-appointment', authDoctor, appointmentCancel);
doctorRouter.get('/dashboard',authDoctor,doctorDashboard)
doctorRouter.post('/update-profile', authDoctor, updateDoctorProfile);
doctorRouter.get('/profile',authDoctor,doctorProfile)

export default doctorRouter;