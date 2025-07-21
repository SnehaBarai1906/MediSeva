import React, { useContext } from 'react';
import { AdminContext } from '../context/AdminContext';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { aToken, setAToken } = useContext(AdminContext);
  const navigate = useNavigate();

  const logout = () => {
    navigate('/');
    aToken && setAToken('');
    aToken && localStorage.removeItem('aToken');
  };

  return (
    <nav className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
      <div className="flex items-center space-x-3">
        <p className="text-2xl font-bold text-purple-700 tracking-wide">MediSeva</p>
        <span className="text-sm text-gray-500 border-l pl-3">
          {aToken ? 'Admin' : 'Doctor'}
        </span>
      </div>
      <button
        onClick={logout}
        className="bg-purple-500 hover:bg-purple-600 text-white text-sm px-4 py-2 rounded-md transition duration-200 shadow-sm"
      >
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
