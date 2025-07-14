import React, { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';
import { AppContext } from '../context/AppContext';

const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const { user } = useContext(AppContext);

  const handleLogout = async () => {
    // If you're using firebase:
    // await signOut(auth);
    navigate('/');
  };

  return (
    <div className='relative'>
      {/* ---------- Desktop Navbar ---------- */}
      <div className='flex items-center justify-between text-sm py-4 mb-5 border-b border-gray-400'>
        <div onClick={() => navigate('/')} className='text-2xl font-bold text-primary cursor-pointer'>
          MediSeva
        </div>

        <ul className='hidden md:flex items-start gap-5 font-medium'>
          <NavLink to='/'><li className='py-1'>HOME<hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden'/></li></NavLink>
          <NavLink to='/doctors'><li className='py-1'>DOCTORS<hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden'/></li></NavLink>
          <NavLink to='/about'><li className='py-1'>ABOUT<hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden'/></li></NavLink>
          <NavLink to='/contact'><li className='py-1'>CONTACT<hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden'/></li></NavLink>
        </ul>

        <div className='flex items-center gap-4'>
          {user ? (
            <div className='flex items-center gap-2 cursor-pointer group relative'>
              <img className='w-8 rounded-full' src={assets.profile_pic} alt="Profile" />
              <img className='w-2.5' src={assets.dropdown_icon} alt="Dropdown" />
              <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block'>
                <div className='min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4'>
                  <p onClick={() => navigate('/my-profile')} className='hover:text-black cursor-pointer'>My profile</p>
                  <p onClick={() => navigate('/my-appointments')} className='hover:text-black cursor-pointer'>Appointments</p>
                  <p onClick={handleLogout} className='hover:text-black cursor-pointer'>Logout</p>
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
      <div className={`${showMenu ? 'fixed w-full' : 'h-0 w-0'} md:hidden right-0 top-0 bottom-0 z-50 bg-white`}>
        <div className="flex items-center justify-between px-5 py-6">
          <img className="w-36" src={assets.logo} alt="Logo" />
          <img
            className="w-6"
            onClick={() => setShowMenu(false)}
            src={assets.cross_icon}
            alt="Close"
          />
        </div>

        <ul className='px-5 text-gray-700 font-medium text-base space-y-4'>
          <li><NavLink to="/" onClick={() => setShowMenu(false)}>HOME</NavLink></li>
          <li><NavLink to="/doctors" onClick={() => setShowMenu(false)}>DOCTORS</NavLink></li>
          <li><NavLink to="/about" onClick={() => setShowMenu(false)}>ABOUT</NavLink></li>
          <li><NavLink to="/contact" onClick={() => setShowMenu(false)}>CONTACT</NavLink></li>
          {!user && (
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
