import express from 'express';
import { doctorlist } from '../controllers/doctor.controller.js';

const doctorRouter = express.Router();


doctorRouter.get('/list', doctorlist)

export default doctorRouter;