import React from 'react';
import { assets } from '../assets/assets';

const Contact = () => {
    return (
        <div className="px-4 py-10 max-w-5xl mx-auto">
            <div className="text-center mb-8">
                <p className="text-3xl font-bold text-gray-800">
                    CONTACT <span className="text-indigo-600">US</span>
                </p>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-10">
                <img src={assets.contact_image} alt="" className="w-full md:w-1/2 rounded-lg shadow-md" />

                <div className="flex flex-col gap-4 text-gray-700 text-sm leading-relaxed">
                    <p className="text-xl font-semibold text-gray-900">We'd love to hear from you</p>
                    <p>
                        Have questions, feedback, or partnership inquiries? Our team is always ready to help and connect with you.
                    </p>
                    <p>
                        Reach out to us via email, phone, or visit our office for any assistance regarding appointments,
                        career opportunities, or collaborations.
                    </p>
                    <p>
                        We value your input and are committed to improving your experience with Medease.
                    </p>
                    <p>
                        Interested in joining our growing team of professionals? Click below to explore exciting job opportunities.
                    </p>
                    <div className="mt-4 space-y-1 text-sm text-gray-600">
                        <p><span className="font-medium text-gray-800">Address:</span> 123 Health Street, MediCity, MH 400001</p>
                        <p><span className="font-medium text-gray-800">Email:</span> contact@medease.com</p>
                        <p><span className="font-medium text-gray-800">Phone:</span> +91 98765 43210</p>
                    </div>
                    <button className="px-5 py-2 mt-3 w-max bg-indigo-600 text-white rounded hover:bg-indigo-700 transition">
                        Explore Jobs
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Contact;
