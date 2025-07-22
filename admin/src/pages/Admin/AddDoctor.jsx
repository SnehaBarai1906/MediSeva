import React, { useContext, useState } from 'react';
import { assets } from '../../assets/assets';
import { AdminContext } from '../../context/AdminContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const AddDoctor = () => {
  const [docImg, setDocImg] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [experience, setExperience] = useState('1 Year');
  const [fees, setFees] = useState('');
  const [about, setAbout] = useState('');
  const [speciality, setSpeciality] = useState('General physician');
  const [degree, setDegree] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');

  const { backendUrl, aToken } = useContext(AdminContext);

 const onSubmitHandler = async (event) => {
  event.preventDefault();

  if (!docImg) {
    return toast.error('Image not selected');
  }

  try {
    const formData = new FormData();
    formData.append('image', docImg);
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('experience', experience);
    formData.append('fees', parseFloat(fees)); // Ensure it's number
    formData.append('about', about);
    formData.append('speciality', speciality); // spelling matches backend
    formData.append('degree', degree);
    formData.append('address', JSON.stringify({ line1: address1, line2: address2 }));

    for (let pair of formData.entries()) {
      console.log(`${pair[0]}:`, pair[1]);
    }

    const { data } = await axios.post(`${backendUrl}/api/admin/add-doctor`, formData, {
      headers: {
        Authorization: `Bearer ${aToken}`, // ✅ CORRECT
      },
    });

    if (data.success) {
      toast.success('Doctor added successfully');
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
    toast.error(error.response?.data?.message || 'Error adding doctor');
  }
};


  return (
    <div className="bg-gray-50 p-6 rounded-md max-w-5xl mx-auto">
      <h2 className="text-xl font-semibold mb-6">Add Doctor</h2>
      <form
        onSubmit={onSubmitHandler}
        className="grid grid-cols-3 gap-6 bg-white p-6 rounded-md shadow-sm"
      >
        {/* Image Upload */}
        <div className="flex flex-col items-center col-span-1">
          <label htmlFor="doc-img" className="cursor-pointer">
            <img
              src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
              alt="upload"
              className="w-24 h-24 object-cover mb-2 rounded-full"
            />
          </label>
          <input
            onChange={(e) => setDocImg(e.target.files[0])}
            type="file"
            id="doc-img"
            hidden
            accept="image/*"
          />
          <p className="text-sm text-blue-600 text-center leading-tight">
            Upload doctor <br /> picture
          </p>
        </div>

        {/* Form Inputs */}
        <div className="col-span-2 grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm mb-1">Your name</p>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Name"
              required
              className="w-full border px-3 py-2 rounded-md"
            />
          </div>

          <div>
            <p className="text-sm mb-1">Speciality</p>
            <select
              value={speciality}
              onChange={(e) => setSpeciality(e.target.value)}
              className="w-full border px-3 py-2 rounded-md"
            >
              <option value="General Physician">General physician</option>
              <option value="Gynecologist">Gynecologist</option>
              <option value="Dermatologist">Dermatologist</option>
              <option value="Pediatricians">Pediatricians</option>
              <option value="Neurologist">Neurologist</option>
              <option value="Gastroenterologist">Gastroenterologist</option>
            </select>
          </div>

          <div>
            <p className="text-sm mb-1">Your Email</p>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Your email"
              required
              className="w-full border px-3 py-2 rounded-md"
            />
          </div>

          <div>
            <p className="text-sm mb-1">Education</p>
            <input
              value={degree}
              onChange={(e) => setDegree(e.target.value)}
              type="text"
              placeholder="Education"
              className="w-full border px-3 py-2 rounded-md"
            />
          </div>

          <div>
            <p className="text-sm mb-1">Your Password</p>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
              required
              className="w-full border px-3 py-2 rounded-md"
            />
          </div>

          <div>
            <p className="text-sm mb-1">Address</p>
            <input
              value={address1}
              onChange={(e) => setAddress1(e.target.value)}
              type="text"
              placeholder="Address 1"
              className="w-full border px-3 py-2 rounded-md mb-2"
            />
            <input
              value={address2}
              onChange={(e) => setAddress2(e.target.value)}
              type="text"
              placeholder="Address 2"
              className="w-full border px-3 py-2 rounded-md"
            />
          </div>

          <div>
            <p className="text-sm mb-1">Experience</p>
            <select
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              className="w-full border px-3 py-2 rounded-md"
            >
              <option value="1 Year">1 Year</option>
              <option value="2 Years">2 Years</option>
              <option value="3 Years">3 Years</option>
              <option value="4 Years">4 Years</option>
              <option value="5+ Years">5+ Years</option>
            </select>
          </div>

          <div>
            <p className="text-sm mb-1">Fees</p>
            <input
              value={fees}
              onChange={(e) => setFees(e.target.value)}
              type="text"
              placeholder="Your fees"
              className="w-full border px-3 py-2 rounded-md"
            />
          </div>

          <div className="col-span-2">
            <p className="text-sm mb-1">About me</p>
            <textarea
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              placeholder="Write about yourself"
              rows="4"
              className="w-full border px-3 py-2 rounded-md"
            ></textarea>
          </div>
        </div>

        <div className="col-span-3 text-right">
          <button
            type="submit"
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-md"
          >
            Add doctor
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddDoctor;
