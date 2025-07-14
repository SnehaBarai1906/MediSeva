import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const MyAppointments = () => {
  const { doctors } = useContext(AppContext);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <p className="text-2xl font-bold mb-6 text-center text-gray-800">My Appointments</p>

      <div className="space-y-6">
        {doctors.slice(0, 2).map((item, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row items-start md:items-center justify-between bg-white p-6 rounded-lg shadow-md space-y-4 md:space-y-0 md:space-x-6"
          >
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
              <div>
                <img src={item.image} alt="" className="w-32 h-32 rounded-lg object-cover border" />
              </div>
              <div className="space-y-1">
                <p className="text-xl font-semibold text-gray-800">{item.name}</p>
                <p className="text-gray-600">{item.speciality}</p>
                <p className="text-sm font-medium text-gray-700">Address:</p>
                <p className="text-sm text-gray-600">{item.address.line1}</p>
                <p className="text-sm text-gray-600">{item.address.line2}</p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium text-gray-700">Date & Time:</span> 25, July, 2024 | 8:30 PM
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <button className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition">Pay Online</button>
              <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition">Cancel Appointment</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAppointments;
