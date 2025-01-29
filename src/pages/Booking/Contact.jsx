import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineCalendar } from "react-icons/ai";
import { BsTelephone } from "react-icons/bs";

export default function Contact() {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitted(true);

        setTimeout(() => {
            setIsSubmitted(false); 
        }, 5000);
    };

    return (
        <div className="contact px-16">
            {isSubmitted && (
                <div className="fixed bottom-0 right-0 m-4 bg-[#155C9C] text-white p-4 rounded-lg shadow-lg">
                    <p>Your message has been sent successfully!</p>
                </div>
            )}

            <div className="tagline flex items-center font-mono text-3xl bg-[url('/images/fortagline.jpg')] bg-cover bg-center h-[35rem] mt-8 shadow-[0px_4px_6px_rgba(0,0,0,0.1),0px_1px_10px_rgba(0,0,0,0.1)] relative rounded-xl">
                <div className="z-0 absolute inset-0 bg-gradient-to-r from-[#155C9C] via-transparent to-transparent opacity-80 rounded-xl"></div>
                <div>
                    <h1 className="text-white z-10 relative ml-5">"Contact Your Consultation Today"</h1>
                </div>
            </div>

            <div className="flex items-center justify-center relative w-full mt-8">
                <hr className="flex-grow border-1 border-gray-300"/>
                <span className="absolute px-4 bg-white text-3xl text-[#213555] font-medium">Contact Form</span>
                <hr className="flex-grow border-1 border-gray-300" />
            </div>

            <div className="bg-[#BFDBE4] h-screen mt-8 p-4 flex w-full">
                <div className="w-[50%] p-4 flex flex-col">
                    <h1 className="text-5xl font-bold text-[#155C9C]">Contact for Consultation</h1>
                    <p className="mt-8 text-lg text-gray-700">We are happy to offer both online and in-person consultations. Fill out the form, and our team will get back to you as soon as possible to confirm your appointment. Your health is our priority!</p>
                    <p className="flex items-center underline mt-8"><AiOutlineCalendar className="text-xl mr-2"/> Choose your preferred consultation date and time</p>
                    <p className="flex items-center mt-4 underline"><BsTelephone className="mr-2"/>Call us: PACH Climaco - 09171403349</p>
                    <p className="flex items-center mt-4 underline"><BsTelephone className="mr-2"/>Call us: PACH Kaya - 09171862245</p>
                </div>

                <div className="w-[50%] p-10">
                    <form className="w-full h-full flex flex-col justify-between bg-white p-10 rounded-xl shadow-xl" onSubmit={handleSubmit}>
                        <div>
                            <div className="flex justify-between w-full mb-4">
                                <input type="text" placeholder="First Name" className="border border-gray-300 rounded px-4 py-2 w-[48%] focus:outline-none focus:ring-2 focus:ring-[#155C9C]"/>
                                <input type="text" placeholder="Last Name" className="border border-gray-300 rounded px-4 py-2 w-[48%] focus:outline-none focus:ring-2 focus:ring-[#155C9C]"/>
                            </div>
                            <div className="mb-4">
                                <input type="email" placeholder="Email" className="border border-gray-300 rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-[#155C9C]"/>
                            </div>
                            <div className="mb-4">
                                <input type="tel" placeholder="Phone Number" className="border border-gray-300 rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-[#155C9C]"/>
                            </div>
                            <div className="mb-4">
                                <input type="text" placeholder="Subject" className="border border-gray-300 rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-[#155C9C]"/>
                            </div>
                            <div className="mb-4">
                                <input type="datetime-local" className="border border-gray-300 rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-[#155C9C]" placeholder="Preferred Consultation Date & Time"/>
                            </div>
                            <div className="mb-4">
                                <textarea placeholder="Message/Consultation Details" className="border border-gray-300 rounded w-full h-[12rem] px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#155C9C]"></textarea>
                            </div>
                        </div>
                        <button className="py-2 bg-[#155C9C] w-full text-white font-medium rounded hover:bg-[#0D3A5C] transition duration-300">Confirm</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
