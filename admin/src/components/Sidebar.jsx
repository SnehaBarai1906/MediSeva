import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AdminContext } from '../context/AdminContext';
import { assets } from '../assets/assets';

const Sidebar = () => {
  const { aToken } = useContext(AdminContext);

  const activeClass =
    'text-blue-600 border-r-4 border-blue-600 bg-blue-50 font-semibold';

  const inactiveClass =
    'text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200';

  return (
    <div className='min-h-screen w-64 bg-gray-50 shadow-lg p-6'>
      {aToken && (
        <ul className='flex flex-col gap-4 text-sm font-medium'>
          <NavLink
            to={'/admin-dashboard'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-md ${
                isActive ? activeClass : inactiveClass
              }`
            }>
            <img src={assets.home_icon} alt='dashboard' className='w-5 h-5' />
            <p>Dashboard</p>
          </NavLink>

          <NavLink
            to={'/all-appointments'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-md ${
                isActive ? activeClass : inactiveClass
              }`
            }>
            <img
              src={assets.appointment_icon}
              alt='appointments'
              className='w-5 h-5'
            />
            <p>Appointments</p>
          </NavLink>

          <NavLink
            to={'/add-doctor'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-md ${
                isActive ? activeClass : inactiveClass
              }`
            }>
            <img src={assets.doctor_icon} alt='add doctor' className='w-5 h-5' />
            <p>Add Doctor</p>
          </NavLink>

          <NavLink
            to={'/doctor-list'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-md ${
                isActive ? activeClass : inactiveClass
              }`
            }>
            <img src={assets.people_icon} alt='doctor list' className='w-5 h-5' />
            <p>Doctors</p>
          </NavLink>
        </ul>
      )}
    </div>
  );
};

export default Sidebar;
