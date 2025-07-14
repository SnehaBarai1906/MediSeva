import React, { useState } from 'react';
import { assets } from '../assets/assets';

const MyProfile = () => {

    const [userData, setUserData] = useState({
        name: 'Sneha',
        image: assets.profile_pic,
        email: 'sneha@example.com',
        phone: '9876543210',
        address: {
            line1: '123, Park Street',
            line2: 'Bangalore, India'
        },
        gender: 'Female',
        dob: '2003-05-07'
    });

    const [isEdit, setIsEdit] = useState(false);

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow space-y-6">
            <div className="flex items-center space-x-4">
                <img src={userData.image} alt="Profile" className="w-24 h-24 rounded-full object-cover border" />
                {
                    isEdit
                        ? <input
                            type="text"
                            value={userData.name}
                            onChange={e => setUserData(prev => ({ ...prev, name: e.target.value }))}
                            className="border px-4 py-2 rounded w-full"
                        />
                        : <p className="text-xl font-semibold">{userData.name}</p>
                }
            </div>

            <hr />

            <div>
                <p className="text-lg font-semibold mb-4">Contact Info</p>
                <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                        <label className="w-24 text-gray-600">Email:</label>
                        {
                            isEdit
                                ? <input
                                    type="email"
                                    value={userData.email}
                                    onChange={e => setUserData(prev => ({ ...prev, email: e.target.value }))}
                                    className="border px-4 py-2 rounded w-full"
                                />
                                : <p className="text-gray-800">{userData.email}</p>
                        }
                    </div>

                    <div className="flex items-center space-x-4">
                        <label className="w-24 text-gray-600">Phone:</label>
                        {
                            isEdit
                                ? <input
                                    type="text"
                                    value={userData.phone}
                                    onChange={e => setUserData(prev => ({ ...prev, phone: e.target.value }))}
                                    className="border px-4 py-2 rounded w-full"
                                />
                                : <p className="text-gray-800">{userData.phone}</p>
                        }
                    </div>

                    <div className="flex items-start space-x-4">
                        <label className="w-24 text-gray-600 pt-2">Address:</label>
                        {
                            isEdit
                                ? <div className="w-full space-y-2">
                                    <input
                                        type="text"
                                        value={userData.address.line1}
                                        onChange={(e) => setUserData(prev => ({
                                            ...prev,
                                            address: { ...prev.address, line1: e.target.value }
                                        }))}
                                        className="border px-4 py-2 rounded w-full"
                                    />
                                    <input
                                        type="text"
                                        value={userData.address.line2}
                                        onChange={(e) => setUserData(prev => ({
                                            ...prev,
                                            address: { ...prev.address, line2: e.target.value }
                                        }))}
                                        className="border px-4 py-2 rounded w-full"
                                    />
                                </div>
                                : <p className="text-gray-800">{userData.address.line1}<br />{userData.address.line2}</p>
                        }
                    </div>
                </div>
            </div>

            <div>
                <p className="text-lg font-semibold mb-4">Basic Information</p>
                <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                        <label className="w-24 text-gray-600">Gender:</label>
                        {
                            isEdit
                                ? <select
                                    value={userData.gender}
                                    onChange={(e) => setUserData(prev => ({ ...prev, gender: e.target.value }))}
                                    className="border px-4 py-2 rounded w-full"
                                >
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                                : <p className="text-gray-800">{userData.gender}</p>
                        }
                    </div>

                    <div className="flex items-center space-x-4">
                        <label className="w-24 text-gray-600">DOB:</label>
                        {
                            isEdit
                                ? <input
                                    type="date"
                                    value={userData.dob}
                                    onChange={(e) => setUserData(prev => ({ ...prev, dob: e.target.value }))}
                                    className="border px-4 py-2 rounded w-full"
                                />
                                : <p className="text-gray-800">{userData.dob}</p>
                        }
                    </div>
                </div>
            </div>

            <div className="text-center">
                {
                    isEdit
                        ? <button
                            onClick={() => setIsEdit(false)}
                            className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 transition"
                        >
                            Save Info
                        </button>
                        : <button
                            onClick={() => setIsEdit(true)}
                            className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 transition"
                        >
                            Edit
                        </button>
                }
            </div>
        </div>
    );
};

export default MyProfile;
