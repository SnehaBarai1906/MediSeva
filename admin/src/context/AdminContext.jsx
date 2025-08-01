import { createContext } from "react";
import { useState } from 'react';
import axios from "axios";
import { toast } from "react-toastify";

export const AdminContext=createContext()

const AdminContextProvider = (props) => {
  const [aToken,setAToken] = useState(localStorage.getItem('aToken')? localStorage.getItem('aToken') : '');
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [doctors, setDoctors] = useState([]); // State to hold doctors list

  const[appointments,setAppointments]=useState([])
  const[dashData,setDashData]=useState(false)

  const getAllDoctors = async () => {
  try {
    const { data } = await axios.post(
      `${backendUrl}/api/admin/all-doctors`,
      {},
      {
        headers: {
          Authorization: `Bearer ${aToken}`,
        },
      }
    );

    if (data.success) {
      setDoctors(data.doctors);
      console.log("Doctors fetched successfully:", data.doctors);
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    console.error('Error fetching doctors:', error);
    toast.error('Failed to fetch doctors');
  }
};

const changeAvailability = async (docId) => {
  try {

    const {data} = await axios.post(
      `${backendUrl}/api/admin/change-availability`,
      { docId },
      {
        headers: {
          Authorization: `Bearer ${aToken}`,
        }

      })
      if (data.success) {
        toast.success(data.message);
        // Update the doctors list after changing availability
        getAllDoctors();
      }
      else{
        toast.error(data.message);
      }
  } catch (error) {
    toast.error(error.message);
  }
}

const getAllAppointments = async () => {
  try {
    const { data } = await axios.get(
      `${backendUrl}/api/admin/appointments`,
      {
        headers: {
          Authorization: `Bearer ${aToken}`,
        },
      }
    );

    if (data.success) {
      setAppointments(data.appointments);
      console.log("Appointments fetched successfully:", data.appointments);
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    console.error('Error fetching appointments:', error);
    toast.error(error.message);
  }
}

const cancelAppointment = async (appointmentId) => {
  try {
    const { data } = await axios.post(
      `${backendUrl}/api/admin/cancel-appointment`,
      { appointmentId },
      {
        headers: {
          Authorization: `Bearer ${aToken}`,
        },
      }
    );

    if (data.success) {
      toast.success(data.message);
      getAllAppointments(); // Refresh appointments after cancellation
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    console.error('Error cancelling appointment:', error);
    toast.error(error.message);
  }
}

const getDashData = async () => {
  try {
    const { data } = await axios.get(
      `${backendUrl}/api/admin/dashboard`,
      {
        headers: { 
          Authorization: `Bearer ${aToken}`,
        },
      }
    );
    if(data.success) {
      setDashData(data.dashData);
      console.log("Dashboard data fetched successfully:", data.dashData);
    }else{
      toast.error(data.message);
    }
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    toast.error('Failed to fetch dashboard data');
  }
}


  const value={
    aToken,
    setAToken,
    backendUrl,
    doctors,
    getAllDoctors,
    changeAvailability,setAppointments,appointments,
    getAllAppointments,
    cancelAppointment,
    dashData,
    getDashData
  }

  

  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
}

export default AdminContextProvider