import React, { useContext, useEffect,useState } from 'react';
import { DoctorContext } from '../../context/DoctorContext';
import { AppContext } from '../../context/AppContext';
import { toast } from 'react-toastify';
import axios from 'axios';
const DoctorProfile = () => {
  const { backendUrl,dToken, getProfileData, profileData, setProfileData } = useContext(DoctorContext);
  const { currency } = useContext(AppContext);

  const [isEdit, setIsEdit] = useState(false);

  const updateProfile = async () => {
    try {
      const updateData={
        address: profileData.address,
        fees: profileData.fees,
        available: profileData.available
      }
      const { data } = await axios.post(`${backendUrl}/api/doctor/update-profile`, updateData, {
        headers: {
          Authorization: `Bearer ${dToken}`
        }
      });
      if(data.success){
        toast.success(data.message);
        setIsEdit(false);
        getProfileData();
      }else{
        toast.error(data.message);
      }
      
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error(error.message);      
    }
  }

  useEffect(() => {
    if (dToken) {
      getProfileData();
    }
  }, [dToken]);

  return profileData && (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow p-6 md:p-10 flex flex-col md:flex-row gap-8">

        {/* Profile Image */}
        <div className="flex-shrink-0">
          <img
            src={profileData.image}
            alt="Doctor"
            className="w-40 h-40 md:w-48 md:h-48 rounded-full object-cover  shadow"
          />
        </div>

        {/* Profile Details */}
        <div className="flex flex-col gap-4 text-gray-700">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">{profileData.name}</h2>

          <div className="text-gray-600 flex items-center gap-3 flex-wrap">
            <p className="text-lg">{profileData.degree} - {profileData.speciality}</p>
            <button className="bg-purple-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
              {profileData.experience}
            </button>
          </div>

          {/* About */}
          <div>
            <h3 className="font-semibold text-lg mb-1 text-gray-800">About</h3>
            <p className="text-sm leading-relaxed text-gray-600">{profileData.about}</p>
          </div>

          {/* Fees */}
          <p className="text-gray-800 font-medium">
            Appointment Fees:&nbsp;
            <span className="text-blue-600">
              {isEdit ? (
                <input
                  type="number"
                  value={profileData.fees}
                  onChange={(e) =>
                    setProfileData(prev => ({
                      ...prev,
                      fees: e.target.value
                    }))
                  }
                  className="border border-gray-300 rounded-md px-3 py-1 w-24 text-sm focus:outline-none focus:ring-1 focus:ring-blue-200 transition"
                  placeholder="Fees"
                />
              ) : (
                `${currency}${profileData.fees}`
              )}
            </span>
          </p>


          {/* Address */}
          <div>
              <h4 className="text-gray-800 font-semibold mb-1">Address:</h4>
              <p className="text-sm leading-snug text-gray-600 space-y-2">
                {isEdit ? (
                  <input
                    type="text"
                    value={profileData.address.line1}
                    onChange={(e) =>
                      setProfileData(prev => ({
                        ...prev,
                        address: { ...prev.address, line1: e.target.value }
                      }))
                    }
                    className="block w-full border border-gray-300 rounded-md px-3 py-1 mb-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                    placeholder="Address Line 1"
                  />
                ) : (
                  profileData.address.line1
                )}
                <br />
                {isEdit ? (
                  <input
                    type="text"
                    value={profileData.address.line2}
                    onChange={(e) =>
                      setProfileData(prev => ({
                        ...prev,
                        address: { ...prev.address, line2: e.target.value }
                      }))
                    }
                    className="block w-full border border-gray-300 rounded-md px-3 py-1 mt-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                    placeholder="Address Line 2"
                  />
                ) : (
                  profileData.address.line2
                )}
              </p>
            </div>


          {/* Availability */}
          <div className="flex items-center gap-2 mt-2">
            <input onChange={()=>isEdit && setProfileData(prev=>({...prev,available:!prev.available}))} checked={profileData.available} type="checkbox" className="w-4 h-4 accent-blue-600" />
            <label className="text-sm text-gray-700">Available</label>
          </div>

          {/* Edit Button */}
          {
            isEdit
            ?<button onClick={updateProfile}
              className="self-start mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
                Save
              </button>
            :<button onClick={()=> setIsEdit(true)}
              className="self-start mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
                Edit
              </button>
          }
          
           
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;
