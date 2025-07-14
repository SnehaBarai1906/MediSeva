import React from 'react';
import { assets } from '../assets/assets';

const About = () => {
    return (
        <div className="px-4 py-10 max-w-5xl mx-auto">
            <div className="text-center mb-8">
                <p className="text-3xl font-bold text-gray-800">
                    ABOUT <span className="text-indigo-600">US</span>
                </p>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-10">
                <img src={assets.about_image} alt="" className="w-full md:w-1/2 rounded-lg shadow-md" />

                <div className="flex flex-col gap-4 text-gray-700 text-sm leading-relaxed">
                    <p className="text-xl font-semibold text-gray-900">Welcome to Medease</p>
                    <p>
                        Medease is your trusted platform for connecting patients with qualified and experienced doctors
                        across a wide range of specialties. Whether you're seeking preventive care or expert treatment,
                        we’re here to simplify your healthcare journey.
                    </p>
                    <p>
                        Our user-friendly system allows patients to book appointments easily, view doctor profiles,
                        and select time slots that suit their schedule — all in just a few clicks.
                    </p>
                    <p>
                        At Medease, we believe that access to quality healthcare should be seamless, convenient, and
                        accessible to everyone. Your health, our priority.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default About;
