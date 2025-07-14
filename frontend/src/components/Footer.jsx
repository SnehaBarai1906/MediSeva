import React from 'react';

const Footer = () => {
    return (
        <div className='md:mx-10'>
            <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
                <div>
                <p className="text-2xl font-extrabold text-primary tracking-wide">Med<span className="text-blue-400">Ease</span></p>
                <p className='w-full md:w-2/3 text-gray-600 leading-6'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis amet optio accusantium eaque, enim soluta sint possimus molestiae assumenda dolorum libero reiciendis harum, molestias ea iste esse doloribus. Quas, tempora!</p>
                </div>

                <div>
                    <p className='text-xl font-medium mb-5'>COMPANY</p>
                    <ul className='flex flex-col gap-2 text-gray-600'>
                        <li>home</li>
                        <li>About</li>
                        <li>Contact Us</li>
                        <li>Privacy Policy</li>
                    </ul>
                </div>

                <div>
                    <p className='text-xl font-medium mb-5'>Get In Touch</p>
                    <ul className='flex flex-col gap-2 text-gray-600'>
                        <li>+91-9087564321</li>
                        <li>MediSeva@gmail.com</li>
                    </ul>
                </div>
            </div>
            <div>
                <hr />
                <p className='py-5 text-sm text-center'>Copyright 2025@ MedEase - All Right Reserved </p>
            </div>
        </div>
    );
}

export default Footer;
