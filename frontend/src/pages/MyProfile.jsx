import React, { useState } from 'react';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import {assets} from '../assets/assets.js'
import axios from 'axios';
import { toast } from 'react-toastify';
const MyProfile = () => {

    const {userData,setUserData,token,backendUrl,loadUserProfileData}=useContext(AppContext)
    const [isEdit, setIsEdit] = useState(false);
    const [image,setImage]= useState(false)

    const updateUserProfileData=async ()=>{
        try {
            const formData=new FormData()
            formData.append('name',userData.name)
            formData.append('phone',userData.phone)
            formData.append('address',JSON.stringify(userData.address))
            formData.append('gender',userData.gender)
            formData.append('dob',userData.dob)

            image && formData.append('image',image)

            const {data}= await axios.post(backendUrl+'/api/user/update-profile',formData,{
                 headers: {
                Authorization: `Bearer ${token}`
                }
            })
            if(data.success){
                toast.success(data.message)
                await loadUserProfileData()
                setIsEdit(false)
                setImage(false)
            }
            else{
                toast.error(data.error)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }

    }

    return userData && (
        <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-xl space-y-6 border border-gray-200">
            <div className="flex items-center space-x-6">
            {
            isEdit ? (
                <label htmlFor="image" className="relative cursor-pointer group">
                <div className="relative w-24 h-24">
                    <img
                    src={image ? URL.createObjectURL(image) : userData.image}
                    alt=""
                    className="w-full h-full object-cover rounded-full border border-gray-300"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                    <img src={assets.upload_icon} alt="Upload Icon" className="w-6 h-6" />
                    </div>
                </div>
                <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden />
                </label>
            ) : (
                <img
                src={userData.image}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover border border-gray-300"
                />
            )
            }

            {
            isEdit ? (
                <input
                type="text"
                value={userData.name}
                onChange={e => setUserData(prev => ({ ...prev, name: e.target.value }))}
                className="border px-4 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
            ) : (
                <p className="text-2xl font-semibold text-gray-800">{userData.name}</p>
            )
            }
        </div>

  <hr />

  <div>
    <p className="text-lg font-semibold text-gray-700 mb-4">Contact Info</p>
    <div className="space-y-4">
      {/* Email */}
      <div className="flex items-center space-x-4">
        <label className="w-24 text-gray-600">Email:</label>
        {
          isEdit ? (
            <input
              type="email"
              value={userData.email}
              onChange={e => setUserData(prev => ({ ...prev, email: e.target.value }))}
              className="border px-4 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          ) : (
            <p className="text-gray-800">{userData.email}</p>
          )
        }
      </div>

      {/* Phone */}
      <div className="flex items-center space-x-4">
        <label className="w-24 text-gray-600">Phone:</label>
        {
          isEdit ? (
            <input
              type="text"
              value={userData.phone}
              onChange={e => setUserData(prev => ({ ...prev, phone: e.target.value }))}
              className="border px-4 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          ) : (
            <p className="text-gray-800">{userData.phone}</p>
          )
        }
      </div>

      {/* Address */}
      <div className="flex items-start space-x-4">
        <label className="w-24 text-gray-600 pt-2">Address:</label>
        {
          isEdit ? (
            <div className="w-full space-y-2">
              <input
                type="text"
                value={userData.address.line1}
                onChange={(e) => setUserData(prev => ({
                  ...prev,
                  address: { ...prev.address, line1: e.target.value }
                }))}
                className="border px-4 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
              <input
                type="text"
                value={userData.address.line2}
                onChange={(e) => setUserData(prev => ({
                  ...prev,
                  address: { ...prev.address, line2: e.target.value }
                }))}
                className="border px-4 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>
          ) : (
            <p className="text-gray-800 whitespace-pre-line">
              {userData.address.line1}
              <br />
              {userData.address.line2}
            </p>
          )
        }
      </div>
    </div>
  </div>

  <div>
    <p className="text-lg font-semibold text-gray-700 mb-4">Basic Information</p>
    <div className="space-y-4">
      {/* Gender */}
      <div className="flex items-center space-x-4">
        <label className="w-24 text-gray-600">Gender:</label>
        {
          isEdit ? (
            <select
              value={userData.gender}
              onChange={(e) => setUserData(prev => ({ ...prev, gender: e.target.value }))}
              className="border px-4 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          ) : (
            <p className="text-gray-800">{userData.gender}</p>
          )
        }
      </div>

      {/* DOB */}
      <div className="flex items-center space-x-4">
        <label className="w-24 text-gray-600">DOB:</label>
        {
          isEdit ? (
            <input
              type="date"
              value={userData.dob ? new Date(userData.dob).toISOString().split('T')[0] : ""}
              onChange={(e) => setUserData(prev => ({ ...prev, dob: e.target.value }))}
              className="border px-4 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          ) : (
            <p className="text-gray-800">{userData.dob}</p>
          )
        }
      </div>
    </div>
  </div>

  <div className="text-center pt-4">
    {
      isEdit ? (
        <button
          onClick={updateUserProfileData}
          className="bg-indigo-600 text-white px-6 py-2 rounded-full hover:bg-indigo-700 transition font-medium"
        >
          Save Info
        </button>
      ) : (
        <button
          onClick={() => setIsEdit(true)}
          className="bg-indigo-600 text-white px-6 py-2 rounded-full hover:bg-indigo-700 transition font-medium"
        >
          Edit
        </button>
      )
    }
  </div>
</div>

    );
};

export default MyProfile;
