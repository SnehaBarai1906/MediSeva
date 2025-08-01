import React, { use, useContext, useEffect } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { assets } from '../../assets/assets';
import { AppContext } from '../../context/AppContext';

const Dashboard = () => {
  const { getDashData, cancelAppointment, aToken, dashData } = useContext(AdminContext);

  const {slotDateFormat} = useContext(AppContext);

  useEffect(() => {
    if (aToken) {
      getDashData();
    }
  }, [aToken]);

  return dashData && (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      {/* Top Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Doctors */}
        <div className="flex items-center p-6 bg-white rounded-2xl shadow hover:shadow-lg transition-all duration-300 group hover:bg-purple-50">
          <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mr-4">
            <img src={assets.doctor_icon} alt="Doctors" className="w-10 h-10 object-contain opacity-80 group-hover:scale-105 transition-transform" />
          </div>
          <div>
            <p className="text-2xl font-semibold text-gray-800">{dashData.doctors}</p>
            <p className="text-gray-500">Doctors</p>
          </div>
        </div>

        {/* Appointments */}
        <div className="flex items-center p-6 bg-white rounded-2xl shadow hover:shadow-lg transition-all duration-300 group hover:bg-purple-50">
          <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mr-4">
            <img src={assets.appointments_icon} alt="Appointments" className="w-8 h-8 object-contain opacity-80 group-hover:scale-105 transition-transform" />
          </div>
          <div>
            <p className="text-2xl font-semibold text-gray-800">{dashData.appointments}</p>
            <p className="text-gray-500">Appointments</p>
          </div>
        </div>

        {/* Patients */}
        <div className="flex items-center p-6 bg-white rounded-2xl shadow hover:shadow-lg transition-all duration-300 group hover:bg-purple-50">
          <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mr-4">
            <img src={assets.patients_icon} alt="Patients" className="w-8 h-8 object-contain opacity-80 group-hover:scale-105 transition-transform" />
          </div>
          <div>
            <p className="text-2xl font-semibold text-gray-800">{dashData.patients}</p>
            <p className="text-gray-500">Patients</p>
          </div>
        </div>
      </div>

      {/* Latest Bookings - Combined Card */}
      <div className="mt-10">
        <div className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition-all duration-300 group hover:bg-purple-50">
          {/* Header */}
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mr-3">
              <img
                src={assets.list_icon}
                alt="Latest Bookings"
                className="w-6 h-6 object-contain opacity-80 group-hover:scale-105 transition-transform"
              />
            </div>
            <p className="text-lg font-semibold text-gray-700 group-hover:text-purple-700">
              Latest Bookings
            </p>
          </div>

          {/* Appointment Items */}
          <div className="space-y-4">
            {dashData.latestAppointments.map((item, index) => (
              <div
                key={index}
                className="flex flex-col md:flex-row items-start md:items-center justify-between bg-gray-50 p-4 rounded-xl border hover:shadow-sm transition-all"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.docData.image}
                    alt="Doctor"
                    className="w-14 h-14 rounded-full object-cover bg-gray-200"
                  />
                  <div>
                    <p className="text-md font-semibold text-gray-800">{item.docData.name}</p>
                    <p className="text-sm text-gray-500">{slotDateFormat(item.slotDate)}</p>
                  </div>
                </div>

                {/* Cancel Logic */}
                <div className="mt-3 md:mt-0">
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
      </div>
    </div>
  );
};

export default Dashboard;
