import React, { useContext, useEffect } from 'react';
import { DoctorContext } from '../../context/DoctorContext';
import { AppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets';

const DoctorAppointment = () => {
  const { dToken, appointments, getAppointments,completeAppointment,cancelAppointment } = useContext(DoctorContext);
  const { calculateAge, slotDateFormat, currency } = useContext(AppContext);

  useEffect(() => {
    if (dToken) {
      getAppointments();
    }
  }, [dToken]);

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-6">All Appointments</h2>

      <div className="overflow-x-auto rounded-xl shadow bg-white">
        <div className="min-w-[800px]">
          {/* Header Row */}
          <div className="grid grid-cols-7 gap-4 bg-blue-100 p-4 font-semibold text-gray-700 border-b text-sm md:text-base">
            <p>#</p>
            <p>Patient</p>
            <p>Payment</p>
            <p>Age</p>
            <p>Date & Time</p>
            <p>Fees</p>
            <p>Action</p>
          </div>

          {/* Data Rows */}
          {appointments.reverse().map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-7 gap-4 items-center p-4 border-b hover:bg-blue-50 transition text-sm md:text-base"
            >
              {/* Index */}
              <p className="text-gray-700">{index + 1}</p>

              {/* Patient Info */}
              <div className="flex items-center gap-2">
                <img
                  src={item.userData.image}
                  alt="patient"
                  className="w-8 h-8 rounded-full object-cover bg-gray-200"
                />
                <p className="text-gray-800">{item.userData.name}</p>
              </div>

              {/* Payment */}
              <p className="capitalize text-gray-600">
                {item.paymentStatus ? 'online' : 'cash'}
              </p>

              {/* Age */}
              <p className="text-gray-600">{calculateAge(item.userData.dob)}</p>

              {/* Date & Time */}
              <p className="text-gray-600">
                {slotDateFormat(item.slotDate)}, {item.slotTime}
              </p>

              {/* Fees */}
              <p className="text-gray-600">
                {currency} {item.amount}
              </p>

              {
                item.cancelled
                ? <p className="text-red-600 font-semibold">Cancelled</p>
                : item.isCompleted
                  ? <p className="text-green-600 font-semibold">Completed</p>
                  :<div className="flex gap-3">
                    <img
                      onClick={() => cancelAppointment(item._id)}
                      src={assets.cancel_icon}
                      alt="Cancel"
                      className="w-10 h-10 cursor-pointer hover:scale-110 transition"
                    />
                    <img
                      onClick={() => completeAppointment(item._id)}
                      src={assets.tick_icon}
                      alt="Confirm"
                      className="w-10 h-10 cursor-pointer hover:scale-110 transition"
                    />
                  </div>
              }
              
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DoctorAppointment;
