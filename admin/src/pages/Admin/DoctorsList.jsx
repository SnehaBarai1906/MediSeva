import React, { useContext, useEffect } from 'react';
import { AdminContext } from '../../context/AdminContext';

const DoctorsList = () => {
  const { doctors, aToken, getAllDoctors } = useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getAllDoctors();
    }
  }, [aToken]);

  return (
    <div className="flex-1 overflow-y-auto p-8 bg-gray-60 h-[calc(100vh-4rem)]">
      <h1 className="text-4xl font-bold text-center text-purple-800 mb-12">Doctors Directory</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {doctors.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 flex flex-col hover:shadow-xl transition-shadow min-h-[350px]"
          >
            <div className="w-full h-65 mb-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover rounded-md"
              />
            </div>

            <div className="flex-1 flex flex-col justify-between">
              <div className="mb-4">
                <h2 className="text-2xl font-semibold text-gray-800">{item.name}</h2>
                <p className="text-base text-gray-500 mt-1">{item.speciality}</p>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={item.available}
                  className="w-5 h-5 rounded border-gray-300 focus:ring-purple-500"
                  readOnly
                />
                <span className="text-sm font-medium text-gray-700">
                  {item.available ? 'Available' : 'Unavailable'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorsList;
