import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const currencysymbol = '$';
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [doctors, setDoctors] = useState([]);
  const [token, setToken] = useState(localStorage.getItem('token')?localStorage.getItem('token') : false);
  const [userData,setUserData]=useState(false)


  const getDoctorsdata = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/doctor/list');
      //console.log(data.doctor);
      if (data.success) {
        setDoctors(data.doctor);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const loadUserProfileData =async()=>{
    try {

      const { data } = await axios.get(backendUrl + '/api/user/get-profile', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      

      if(data.success){
        setUserData(data.userData)
      }else{
        console.log(error)
        toast.error(error.message)
      }
      
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  useEffect(() => {
    getDoctorsdata();
  }, []); // <-- this should be outside any function


  useEffect(()=>{
    if(token){
      loadUserProfileData()
    }
    else{
      setUserData(false)
    }
  },[token])

  const value = {
    doctors,
    currencysymbol,
    token,
    setToken,
    backendUrl,
    userData,
    setUserData,
    loadUserProfileData
  }; 

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
