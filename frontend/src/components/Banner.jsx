import React, { use } from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';

const Banner = () => {
  const navigate = useNavigate();
  return (
    <div className="flex bg-primary rounded-lg px-6 sm:px-10 md:px-14 lg:px-12 my-20 md:mx-20 items-center justify-between">
      {/* -------- Left Side -------- */}
      <div className="flex-1 py-8 sm:py-10 md:py-16 lg:py-24 lg:pl-5">
        <div className="space-y-4">
          <p className="text-white text-3xl sm:text-4xl font-semibold">Book Appointment</p>
          <p className="text-white text-lg">With 100+ Trusted Doctors</p>
        </div>
        <button onClick={()=>{navigate('/login');scrollTo(0,0)}} className="mt-6 bg-white text-primary font-medium px-6 py-3 rounded-full hover:bg-gray-100 transition">
          Create account
        </button>
      </div>

      {/* -------- Right Side -------- */}
      <div className="hidden md:block md:w-1/2 lg:w-[370px] relative">
        <img
          className="w-full absolute bottom-0 right-0 max-w-md"
          src={assets.appointment} // Make sure assets.appointment is defined and imported properly
          alt="Appointment illustration"
        />
      </div>
    </div>
  );
};

export default Banner;
