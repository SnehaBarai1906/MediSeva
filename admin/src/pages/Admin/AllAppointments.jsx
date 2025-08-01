import React, { useContext, useEffect } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { AppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets';

const AllAppointments = () => {
  const { aToken, getAllAppointments, appointments, cancelAppointment } = useContext(AdminContext);
  const { calculateAge, slotDateFormat, currency } = useContext(AppContext);

  useEffect(() => {
    if (aToken) {
      getAllAppointments();
    }
  }, [aToken]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">All Appointments</h2>

      <div className="bg-white shadow-md rounded-xl overflow-hidden">
        {/* Table Header */}
        <div className="hidden md:grid grid-cols-7 gap-4 px-6 py-3 bg-gray-100 text-sm font-semibold uppercase text-gray-700">
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Actions</p>
        </div>

        {/* Table Body */}
        {appointments.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-1 md:grid-cols-7 gap-4 px-6 py-4 border-t border-gray-100 hover:bg-gray-50 transition text-sm text-gray-800 items-center"
          >
            {/* Index */}
            <div className="md:block">
              <p className="font-semibold md:hidden text-gray-500">#</p>
              <p>{index + 1}</p>
            </div>

            {/* Patient Info */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
                <img src={item.userData.image} alt="" className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="font-semibold md:hidden text-gray-500">Patient</p>
                <p>{item.userData.name}</p>
              </div>
            </div>

            {/* Age */}
            <div>
              <p className="font-semibold md:hidden text-gray-500">Age</p>
              <p>{calculateAge(item.userData.dob)}</p>
            </div>

            {/* Date & Time */}
            <div>
              <p className="font-semibold md:hidden text-gray-500">Date & Time</p>
              <p>
                {slotDateFormat(item.slotDate)},<br className="md:hidden" />
                {item.slotTime}
              </p>
            </div>

            {/* Doctor Info */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
                <img src={item.docData.image} alt="" className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="font-semibold md:hidden text-gray-500">Doctor</p>
                <p>{item.docData.name}</p>
              </div>
            </div>

            {/* Fees */}
            <div>
              <p className="font-semibold md:hidden text-gray-500">Fees</p>
              <p>{currency}{item.amount}</p>
            </div>

            {/* Actions */}
            <div>
              <p className="font-semibold md:hidden text-gray-500">Actions</p>
              {item.cancelled ? (
                <p className="text-red-500 font-medium">Cancelled</p>
              ) :item.isCompleted
              ?<p className="green-red-500 font-medium">Completed</p>
              : (
                <img
                  onClick={() => cancelAppointment(item._id)}
                  src={assets.cancel_icon}
                  alt="Cancel"
                  className="w-6 h-6 cursor-pointer hover:scale-110 transition"
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllAppointments;
