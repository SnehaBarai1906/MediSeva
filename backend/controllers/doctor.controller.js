import doctorModel from "../models/doctor.model.js";
import bcypt from "bcrypt";
import jwt from "jsonwebtoken";
import appointmentModel from "../models/appointment.model.js";

const changeAvailability = async (req, res) => {
  try {
    const { docId } = req.body;

    const docData = await doctorModel.findById(docId);
    await doctorModel.findByIdAndUpdate(docId, {
      available: !docData.available,})
      res.json({success: true,message: 'Doctor availability updated successfully'})
  }catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
}

const doctorlist = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select(['-password','-email'])
    res.json({ success: true, doctor: doctors });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
}

//api to doctor login
const loginDoctor = async (req, res) => {
  try {
    const { email, password } = req.body;

    const doctor = await doctorModel.findOne({ email });
    if (!doctor) {
      return res.status(400).json({ success: false, message: 'Doctor not found' });
    }
    const isMatch = await bcypt.compare(password, doctor.password);
    if (isMatch) {
      const token = jwt.sign({id: doctor._id}, process.env.JWT_SECRET);
      return res.status(200).json({ success: true, message: 'Login successful', token });
    }else{
      res.json({ success: false, message: 'Invalid credentials' });
    }

    
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
}

//api to get doctor appointments in doctor panel
const appointmentsDoctor = async (req, res) => {
  try {
    const docId = req.docId;
    const appointments=await appointmentModel.find({docId})
    
    res.json({ success: true, appointments });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
}

//api to mark appointment as completed

const appointmentComplete = async (req, res) => {
  try {
    const docId = req.docId;
    const { appointmentId } = req.body;
    const appointmentData = await appointmentModel.findById(appointmentId);
    if (appointmentData && appointmentData.docId === docId) {
      await appointmentModel.findByIdAndUpdate(appointmentId, {
      isCompleted: true,
      });
      return res.json({ success: true, message: 'Appointment completed' });
    }else{
      return res.status(400).json({ success: false, message: 'mark failed' });
    }
    
  
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
}
//api to cancel appointment 

const appointmentCancel = async (req, res) => {
  try {
    const docId = req.docId;
    const { appointmentId } = req.body;
    const appointmentData = await appointmentModel.findById(appointmentId);
    if (appointmentData && appointmentData.docId === docId) {
      await appointmentModel.findByIdAndUpdate(appointmentId, {
      cancelled: true,
      });
      return res.json({ success: true, message: 'Appointment cancelled' });
    }else{
      return res.status(400).json({ success: false, message: 'cancellation failed' });
    }
    
  
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
}

//api to get dashboard data for doctor panel
const doctorDashboard = async (req, res) => {
  try {

    const docId = req.docId;
    const appointments=await appointmentModel.find({docId})
    let earnings= 0;
    appointments.map((item) => {
      if (item.isCompleted || item.payment) {
        earnings += item.amount;
      }
    })

    let pateints=[];
    appointments.map((item) => {
      if (!pateints.includes(item.userId)) {
        pateints.push(item.userId);
      }
    })

    const dashData={
      earnings,
      appointments: appointments.length,
      patients: pateints.length,
      latestAppointments: appointments.reverse().slice(0, 5)
    }
    res.json({ success: true, dashData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
    
  }
}


//api tio get doctor profike
const doctorProfile=async(req,res)=>{
  try {
    const docId = req.docId;
    const profileData=await doctorModel.findById(docId).select('-password');
    res.json({ success: true, profileData });
    
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
    
  }
}

//api to update doctor profile
const updateDoctorProfile=async(req,res)=>{
  try {
    const docId = req.docId;
    const {fees,address,available}=req.body;
    await doctorModel.findByIdAndUpdate(docId,{
      fees,address,available
    });
    res.json({ success: true, message: 'Profile updated successfully' });
  
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }

}
export { changeAvailability , doctorlist,loginDoctor,appointmentsDoctor,appointmentComplete,appointmentCancel,doctorDashboard ,updateDoctorProfile,doctorProfile };