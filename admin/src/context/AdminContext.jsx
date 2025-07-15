import { createContext } from "react";
import { useState } from 'react';

export const AdminContext=createContext()

const AdminContextProvider = (props) => {
  const [aToken,setAToken] = useState(localStorage.getItem('aToken')? localStorage.getItem('aToken') : '');
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  // useEffect(() => {
  //   const token = localStorage.getItem('aToken');
  //   if (token) {
  //     setAToken(token);
  //   }
  // }, []);
  const value={
    aToken,
    setAToken,
    backendUrl
  }

  

  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
}

export default AdminContextProvider;