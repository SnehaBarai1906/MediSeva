import { createContext } from "react";
import { useState } from 'react';
import axios from "axios";
import { toast } from "react-toastify";

export const DoctorContext=createContext()

const DoctorContextProvider = ( props ) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const[dToken,setDToken] = useState(localStorage.getItem('dToken')? localStorage.getItem('dToken') : '' );
  const [appointments,setAppointments] = useState([]);
  const [dashData,setdashData] = useState(false);
  const [profileData,setProfileData] = useState(false);

  const getAppointments = async () => {
    try {
      const {data}=await axios.get(`${backendUrl}/api/doctor/appointments`, {
        headers: {
          Authorization: `Bearer ${dToken}`
        }
      });
      if (data.success) {
        setAppointments(data.appointments.reverse());
        console.log(data.appointments.reverse())
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error fetching appointments:", error);
      toast.error(error.message)
    }
  }

  const completeAppointment = async (appointmentId) => {
    try {
      const {data}=await axios.post(`${backendUrl}/api/doctor/complete-appointment`, { appointmentId }, {
        headers: {
          Authorization: `Bearer ${dToken}`
        }
      });
      if (data.success) {
        toast.success(data.message);
        getAppointments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error completing appointment:", error);
      toast.error(error.message);
    }
  }

  const cancelAppointment = async (appointmentId) => {
    try {
      const {data}=await axios.post(`${backendUrl}/api/doctor/cancel-appointment`, { appointmentId }, {
        headers: {
          Authorization: `Bearer ${dToken}`
        }
      });
      if (data.success) {
        toast.success(data.message);
        getAppointments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error completing appointment:", error);
      toast.error(error.message);
    }
  }
  const getDashData = async () => {
    try {
      const {data}=await axios.get(backendUrl+'/api/doctor/dashboard', {
        headers: {Authorization: `Bearer ${dToken}`}
      });
      if(data.success) {
        setdashData(data.dashData);
        console.log(data.dashData);
      }else{
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      toast.error(error.message);
    }
  }

  const getProfileData = async () => {
    try {
      const {data}=await axios.get(backendUrl+'/api/doctor/profile', {
        headers: {Authorization: `Bearer ${dToken}`}
      });
      if(data.success) {
        setProfileData(data.profileData);
        console.log(data.profileData);
      }else{
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  }


  const value={
    dToken,
    setDToken,
    backendUrl,
    appointments,
    setAppointments,
    getAppointments,
    completeAppointment,
    cancelAppointment,
    getDashData,setdashData,
    dashData,
    profileData,
    setProfileData, 
    getProfileData
  }


  return (
    <DoctorContext.Provider value={value}>
      {props.children}
    </DoctorContext.Provider>
  );
}


export default DoctorContextProvider