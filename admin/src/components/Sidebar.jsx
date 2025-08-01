import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AdminContext } from '../context/AdminContext';
import { DoctorContext } from '../context/DoctorContext';
import { assets } from '../assets/assets';

const Sidebar = () => {
  const { aToken } = useContext(AdminContext);
  const { dToken } = useContext(DoctorContext);

  const activeClass =
    'text-blue-600 border-r-4 border-blue-600 bg-blue-50 font-semibold';

  const inactiveClass =
    'text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200';

  return (
    <div className='hidden md:block min-h-screen w-64 bg-gray-50 shadow-lg p-4 overflow-y-auto sticky top-0'>
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
            <p className='hidden md:block'>Dashboard</p>
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
            <p className='hidden md:block'>Appointments</p>
          </NavLink>

          <NavLink
            to={'/add-doctor'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-md ${
                isActive ? activeClass : inactiveClass
              }`
            }>
            <img src={assets.doctor_icon} alt='add doctor' className='w-5 h-5' />
            <p className='hidden md:block'>Add Doctor</p>
          </NavLink>

          <NavLink
            to={'/doctor-list'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-md ${
                isActive ? activeClass : inactiveClass
              }`
            }>
            <img src={assets.people_icon} alt='doctor list' className='w-5 h-5' />
            <p className='hidden md:block'>Doctors List</p>
          </NavLink>
        </ul>
      )}

      {dToken && (
        <ul className='flex flex-col gap-4 text-sm font-medium'>
          <NavLink
            to={'/doctor-dashboard'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-md ${
                isActive ? activeClass : inactiveClass
              }`
            }>
            <img src={assets.home_icon} alt='dashboard' className='w-5 h-5' />
            <p className='hidden md:block'>Dashboard</p>
          </NavLink>

          <NavLink
            to={'/doctor-appointments'}
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
            <p className='hidden md:block'>Appointments</p>
          </NavLink>

          <NavLink
            to={'/doctor-profile'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-md ${
                isActive ? activeClass : inactiveClass
              }`
            }>
            <img src={assets.people_icon} alt='profile' className='w-5 h-5' />
            <p className='hidden md:block'>Profile</p>
          </NavLink>
        </ul>
      )}
    </div>
  );
};

export default Sidebar;
