import React, { use, useState } from 'react';
import { assets } from '../../assets/assets';
import { useContext } from 'react';
import { AdminContext } from '../../context/AdminContext.jsx';
import { toast } from 'react-toastify';
import axios from 'axios';

const AddDoctor = () => {
  const [doctorImage, setDoctorImage] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [experience, setExperience] = useState('1 year');
  const [fees, setFees] = useState('');
  const [about, setAbout] = useState('');
  const [speciality, setSpeciality] = useState('General Physician');
  const [education, setEducation] = useState('');
  const [degree, setDegree] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');

  const {backendUrl,aToken} = useContext(AdminContext);


  const onSubmitHandler = async(e) => {
    e.preventDefault()

    try{

      if(!doctorImage){
        return toast.error("Please upload a doctor image");
      }

      const formData = new FormData();
      formData.append('image', doctorImage);
      formData.append('name', name);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('experience', experience);
      formData.append('fees', Number(fees));
      formData.append('about', about);
      formData.append('speciality', speciality);
      formData.append('education', education);
      formData.append('degree', degree);
      formData.append('address', JSON.stringify({line1: address1, line2: address2}));


      //console log(formData);
      formData.forEach((value, key) => {
        console.log(`${key}: ${value}`);
      });

      const {data}= await axios.post(backendUrl+'/api/admin/add-doctor', formData, {
        headers: {aToken} })

      if(data.success){
        toast.success(data.message);
        setDoctorImage(false);
        setName('');
        setEmail('');
        setPassword(''); 
        setFees('');
        setAbout('');
        setEducation('');
        setDegree('');
        setAddress1('');  
        setAddress2('');
      }else{
        toast.error(data.message);
      }

    }catch(err) {
      toast.error(err.message);
      console.log(err);
    }

  }

  return (
    <div className="ml-64 mt-20 px-4 py-6 overflow-y-auto h-[calc(100vh-5rem)]">
      <form onSubmit={onSubmitHandler} className="bg-[#f8f9fd] backdrop-blur-md rounded-xl p-8 max-w-5xl mx-auto space-y-6">
        <h2 className="text-3xl font-bold text-purple-700 text-center">Add Doctor</h2>

        {/* Profile Image Upload */}
        <div className="flex justify-center items-center flex-col gap-2">
          <label htmlFor="doc-img" className="cursor-pointer relative w-36 h-36 rounded-full overflow-hidden border-2 border-purple-100 hover:border-purple-300 transition">
            <img src={doctorImage ? URL.createObjectURL(doctorImage) : assets.upload_area} alt="Upload" className="w-full h-full object-cover" />
            <input onChange={(e) => setDoctorImage(e.target.files[0])} type="file" id="doc-img" hidden />
          </label>
          <p className="text-sm text-gray-500">Click to upload doctor photo</p>
        </div>

        {/* Doctor Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          <Input label="Doctor Name" type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
          <Input label="Doctor Email" type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
          <Input label="Doctor Password" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
          <Select label="Experience" value={experience} onChange={e => setExperience(e.target.value)} options={Array.from({ length: 10 }, (_, i) => `${i + 1} year`)} />
          <Input label="Fees" type="number" placeholder="Fees" value={fees} onChange={e => setFees(e.target.value)} />
          <Select label="Speciality" value={speciality} onChange={e => setSpeciality(e.target.value)} options={['General Physician', 'Gynecologist', 'Dermatologist', 'Pediatricians', 'Neurologist', 'Gastroenterologist']} />
          <Input label="Education" type="text" placeholder="Education" value={education} onChange={e => setEducation(e.target.value)} />
          <div>
            <label className="text-gray-700 font-medium">Address</label>
            <input type="text" placeholder="Address 1" value={address1} onChange={e => setAddress1(e.target.value)} required className="w-full mb-2 mt-1 p-2 rounded-md border" />
            <input type="text" placeholder="Address 2" value={address2} onChange={e => setAddress2(e.target.value)} required className="w-full p-2 rounded-md border" />
          </div>
        </div>

        {/* About Doctor */}
        <div>
          <label className="text-gray-700 font-medium">About Doctor</label>
          <textarea
            rows={4}
            placeholder="Write about doctor"
            value={about}
            onChange={e => setAbout(e.target.value)}
            className="w-full mt-1 p-3 rounded-md border"
          />
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white font-medium px-6 py-2 rounded-md shadow-sm">
            Add Doctor
          </button>
        </div>
      </form>
    </div>
  );
};

// Controlled Input
const Input = ({ label, type, placeholder, value, onChange }) => (
  <div>
    <label className="text-gray-700 font-medium">{label}</label>
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required
      className="w-full mt-1 p-2 rounded-md border"
    />
  </div>
);

// Controlled Select
const Select = ({ label, options, value, onChange }) => (
  <div>
    <label className="text-gray-700 font-medium">{label}</label>
    <select
      value={value}
      onChange={onChange}
      className="w-full mt-1 p-2 rounded-md border"
      required
    >
      {options.map((opt, i) => (
        <option key={i} value={opt}>{opt}</option>
      ))}
    </select>
  </div>
);

export default AddDoctor;
