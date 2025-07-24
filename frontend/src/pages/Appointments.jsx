import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets';
import { toast } from 'react-toastify';
import axios from 'axios';

const Appointments = () => {
  const { docId } = useParams();
  const { doctors, currencysymbol,backendUrl,token,getDoctorsdata } = useContext(AppContext); // ❌ removed setBookedAppointment


  const navigate=useNavigate()
  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState('');

  const daysofWeek = ['SUN', 'MON', 'TUE', 'WED', 'THUR', 'FRI', 'SAT'];

  const bookedAppointment=async()=>{
    if(!token){
      toast.warn('Login to book appointmrent')
      return navigate('/login')
    }

    try {
      const date=docSlots[slotIndex][0].datetime

      let day=date.getDate();
      let month=date.getMonth()+1;
      let year=date.getFullYear()

      const slotDate=day+ "-"+month+"-"+year
      const {data}=await axios.post(backendUrl+'/api/user/book-appointment',{docId,slotDate,slotTime},{ headers: {
          Authorization: `Bearer ${token}`
        }})

        if(data.success){
          toast.success(data.message)
          getDoctorsdata()
          navigate('/my-appointments')
        }else{
          toast.error(data.message)
        }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    const doc = doctors.find(doc => doc._id === docId);
    setDocInfo(doc);
  }, [docId, doctors]);

useEffect(() => {
  if (!docInfo) return;

  const bookedSlots = docInfo.slots_booked || {}; // contains dates with time arrays
  const slots = [];

  for (let i = 0; i < 7; i++) {
    let date = new Date();
    date.setDate(date.getDate() + i);
    let daySlots = [];

    let start = new Date(date.setHours(10, 0, 0, 0));
    let end = new Date(date.setHours(21, 0, 0, 0));

    for (let d = new Date(start); d < end; d.setMinutes(d.getMinutes() + 30)) {
      const slotDateKey = `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`;
      const slotTimeStr = d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      // Only include slot if it's not already booked
      if (
        !bookedSlots[slotDateKey] ||
        !bookedSlots[slotDateKey].includes(slotTimeStr)
      ) {
        daySlots.push({
          datetime: new Date(d),
          time: slotTimeStr,
        });
      }
    }

    slots.push(daySlots);
  }

  setDocSlots(slots);
}, [docInfo]);


  if (!docInfo) return null;

  return (
    <div className="max-w-6xl mx-auto p-6 mt-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white shadow-lg rounded-lg p-6">
        {/* Doctor Info */}
        <div className="md:col-span-1 flex flex-col items-center">
          <img src={docInfo.image} alt="" className="w-40 h-52 object-cover rounded-lg shadow" />
          <p className="text-lg font-bold mt-4 text-center">{docInfo.name}</p>
          <div className="flex items-center gap-2 mt-2">
            <img src={assets.verified_icon} alt="verified" className="w-4 h-4" />
            <p className="text-sm text-gray-600">
              {docInfo.degree} - {docInfo.speciality}
            </p>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            Experience: {docInfo.experience}
          </p>
        </div>

        {/* Doctor Details & Slots */}
        <div className="md:col-span-2 flex flex-col gap-4">
          <div>
            <p className="text-sm font-medium text-gray-700 flex items-center gap-1">
              About <img src={assets.info_icon} alt="" className="w-4 h-4" />
            </p>
            <p className="text-gray-600 text-sm mt-1 leading-relaxed">{docInfo.about}</p>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-700">
              Appointment fee:
              <span className="font-semibold text-black">
                {currencysymbol}{docInfo.fees}
              </span>
            </p>
          </div>

          {/* Slots */}
          <div className="mt-4">
            <p className="text-lg font-semibold text-gray-800 mb-3">Booking Slots</p>

            <div className="flex gap-3 overflow-x-auto mb-5 pb-2">
              {docSlots.map((item, index) => (
                <div
                  key={index}
                  onClick={() => setSlotIndex(index)}
                  className={`flex flex-col items-center px-4 py-2 rounded-full min-w-[60px] cursor-pointer text-sm ${
                    slotIndex === index
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  <p className="font-medium">{item[0] && daysofWeek[item[0].datetime.getDay()]}</p>
                  <p>{item[0] && item[0].datetime.getDate()}</p>
                </div>
              ))}
            </div>

            <div className="overflow-x-auto max-w-full pb-2">
              <div className="flex gap-3 whitespace-nowrap">
                {docSlots[slotIndex]?.map((item, index) => (
                  <p
                    key={index}
                    onClick={() => setSlotTime(item.time)}
                    className={`px-4 py-1.5 rounded-full cursor-pointer text-sm border shrink-0 ${
                      slotTime === item.time
                        ? "bg-indigo-600 text-white border-indigo-600"
                        : "bg-gray-100 text-gray-700 border-gray-300"
                    }`}
                  >
                    {item.time.toLowerCase()}
                  </p>
                ))}
              </div>
            </div>

            <button
              className="mt-6 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-full font-medium text-sm transition"
              onClick={
                //if (!slotTime) return alert("Please select a time slot");
                bookedAppointment
              }
            >
              Book an appointment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appointments;
