import React, { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';
import { AppContext } from '../context/AppContext';

const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const { token,setToken } = useContext(AppContext);
  const logout = () => {
    setToken(false)
    localStorage.removeItem('token');
  }
 

  return (
    <div className='relative'>
      {/* ---------- Desktop Navbar ---------- */}
      <div className='flex items-center justify-between text-sm py-4 mb-5 border-b border-gray-400'>
        <div onClick={() => navigate('/')} className='text-2xl font-bold text-primary cursor-pointer'>
          MediSeva
        </div>

        <ul className='hidden md:flex items-start gap-5 font-medium'>
          <NavLink to='/'><li className='py-1'>HOME<hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden'/></li></NavLink>
          <NavLink to='/doctor'><li className='py-1'>DOCTORS<hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden'/></li></NavLink>
          <NavLink to='/about'><li className='py-1'>ABOUT<hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden'/></li></NavLink>
          <NavLink to='/contact'><li className='py-1'>CONTACT<hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden'/></li></NavLink>
        </ul>

        <div className='flex items-center gap-4'>
          {token ? (
            <div className='flex items-center gap-2 cursor-pointer group relative'>
              <img className='w-8 rounded-full' src={assets.profile_pic} alt="Profile" />
              <img className='w-2.5' src={assets.dropdown_icon} alt="Dropdown" />
              <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block'>
                <div className='min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4'>
                  <p onClick={() => navigate('/my-profile')} className='hover:text-black cursor-pointer'>My profile</p>
                  <p onClick={() => navigate('/my-appointments')} className='hover:text-black cursor-pointer'>Appointments</p>
                  <p onClick={logout} className='hover:text-black cursor-pointer'>Logout</p>
                </div>
              </div>
            </div>
          ) : (
            <button
              onClick={() => navigate('/login')}
              className='bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block'
            >
              Create Account
            </button>
          )}
        </div>

        {/* ----- Hamburger Icon for Mobile ----- */}
        <img
          onClick={() => setShowMenu(true)}
          className='w-6 md:hidden'
          src={assets.menu_icon}
          alt="Menu"
        />
      </div>

      {/* ---------- Mobile Menu ---------- */}
      {/* ---------- Mobile Menu ---------- */}
      <div className={`fixed top-0 right-0 w-full h-full bg-white z-50 transition-transform duration-300 ease-in-out md:hidden ${showMenu ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex items-center justify-between px-5 py-6 border-b">
          <div onClick={() => navigate('/')} className="text-2xl font-bold text-primary">MediSeva</div>
          <img
            className="w-6 cursor-pointer"
            onClick={() => setShowMenu(false)}
            src={assets.cross_icon}
            alt="Close"
          />
        </div>

        <ul className='px-5 text-gray-700 font-medium text-base space-y-6 mt-6'>
          <li><NavLink to="/" onClick={() => setShowMenu(false)}>HOME</NavLink></li>
          <li><NavLink to="/doctor" onClick={() => setShowMenu(false)}>DOCTORS</NavLink></li>
          <li><NavLink to="/about" onClick={() => setShowMenu(false)}>ABOUT</NavLink></li>
          <li><NavLink to="/contact" onClick={() => setShowMenu(false)}>CONTACT</NavLink></li>
          {!token && (
            <li>
              <button
                onClick={() => {
                  navigate('/login');
                  setShowMenu(false);
                }}
                className="bg-primary text-white px-4 py-2 rounded-full w-full"
              >
                Create Account
              </button>
            </li>
          )}
        </ul>
      </div>

    </div>
  );
};

export default Navbar;
