import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const MyAppointments = () => {
  const { backendUrl, token, getDoctorsdata } = useContext(AppContext);

  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();
  const months = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split('-');
    return dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2];
  };

  const getUserAppointment = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/appointment`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        setAppointments(data.appointments.reverse());
        console.log(data.appointments);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const initPay = async (order) => {

    const options = {
       key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "MediSeva",
      description: "Appointment Payment",
      order_id: order.id,
      receipt:order.receipt,
      handler: async (response) => {
        try {
          const { data } = await axios.post(`${backendUrl}/api/user/verify-razorpay`,response, {
            headers: { Authorization: `Bearer ${token}` }});
          if (data.success) {
            getUserAppointment();
            navigate('/my-appointments');
          }
        } catch (error) {
          console.log(error);
          toast.error(error.message);
        }
      }
    }
    const rzp=new window.Razorpay(options);
    rzp.open();

  }

  const appointmentRazorpay = async (appointmentId) => {
    try {
      const { data } = await axios.post(`${backendUrl}/api/user/payment-razorpay`, 
        { appointmentId }, {headers: { Authorization: `Bearer ${token}` }});
        if (data.success) {
          initPay(data.order);
        }
    } catch (error) {
      
    }
  } 

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(`${backendUrl}/api/user/cancel-appointment`, { appointmentId }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        toast.success(data.message);
        getUserAppointment();
        getDoctorsdata();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      getUserAppointment();
    }
  }, [token]);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <p className="text-2xl font-bold mb-6 text-center text-gray-800">My Appointments</p>

      <div className="space-y-6">
        {appointments.map((item, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row items-start md:items-center justify-between bg-white p-6 rounded-xl shadow-md border border-gray-200 space-y-4 md:space-y-0 md:space-x-6"
          >
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
              <img src={item.docData.image} alt="" className="w-28 h-28 rounded-lg object-cover border" />
              <div className="space-y-1 text-sm">
                <p className="text-lg font-semibold text-gray-800">{item.docData.name}</p>
                <p className="text-gray-600">{item.docData.speciality}</p>
                <p className="font-medium text-gray-700 mt-1">Address:</p>
                <p className="text-gray-600">{item.docData.address.line1}</p>
                <p className="text-gray-600">{item.docData.address.line2}</p>
                <p className="text-gray-600 mt-1">
                  <span className="font-medium text-gray-700">Date & Time:</span> {slotDateFormat(item.slotDate)} | {item.slotTime}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-2 w-full md:w-auto">
              {item.isCompleted ? (
                <button
                  className="bg-green-100 text-green-700 px-4 py-2 rounded-md font-medium cursor-not-allowed"
                  disabled
                >
                  Appointment Completed
                </button>
              ) : item.cancelled ? (
                <button
                  className="bg-gray-200 text-red-700 px-4 py-2 rounded-md font-medium cursor-not-allowed"
                  disabled
                >
                  Appointment Cancelled
                </button>
              ) : (
                <>
                  <button
                    className="bg-white border border-zinc-300 text-zinc-700 px-4 py-2 rounded-md hover:border-zinc-600 hover:text-zinc-900 transition font-medium shadow-sm"
                    onClick={() => cancelAppointment(item._id)}
                  >
                    Cancel Appointment
                  </button>

                  {item.payment ? (
                    <button
                      className="bg-green-100 text-green-700 px-4 py-2 rounded-md font-semibold cursor-not-allowed"
                      disabled
                    >
                      Paid
                    </button>
                  ) : (
                    <button
                      onClick={() => appointmentRazorpay(item._id)}
                      className="bg-white border border-zinc-300 text-zinc-700 px-4 py-2 rounded-md hover:border-zinc-600 hover:text-zinc-900 transition font-medium shadow-sm"
                    >
                      Pay Online
                    </button>
                  )}
                </>
              )}
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAppointments;
