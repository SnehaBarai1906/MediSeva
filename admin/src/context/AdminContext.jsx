import { createContext } from "react";
import { useState } from 'react';
import axios from "axios";
import { toast } from "react-toastify";

export const AdminContext=createContext()

const AdminContextProvider = (props) => {
  const [aToken,setAToken] = useState(localStorage.getItem('aToken')? localStorage.getItem('aToken') : '');
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [doctors, setDoctors] = useState([]); // State to hold doctors list
  // useEffect(() => {
  //   const token = localStorage.getItem('aToken');
  //   if (token) {
  //     setAToken(token);
  //   }
  // }, []);

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

  const value={
    aToken,
    setAToken,
    backendUrl,
    doctors,
    getAllDoctors,
    changeAvailability
  }

  

  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
}

export default AdminContextProvider