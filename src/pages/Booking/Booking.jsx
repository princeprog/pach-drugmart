import { useState } from "react";
import { AiOutlineCalendar } from "react-icons/ai";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export default function Booking() {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedSlot, setSelectedSlot] = useState(null);

    const timeSlots = {
        morning: [
            "8:00 AM - 9:00 AM",
            "9:00 AM - 10:00 AM",
            "10:00 AM - 11:00 AM",
            "11:00 AM - 12:00 PM",
        ],
        afternoon: [
            "1:00 PM - 2:00 PM",
            "2:00 PM - 3:00 PM",
            "3:00 PM - 4:00 PM",
            "4:00 PM - 5:00 PM",
        ],
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
        setSelectedSlot(null);
    };

    const handleSlotSelection = (slot) => {
        setSelectedSlot(slot);
    };

    return (
        <div className="booking px-16">
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
                
                <div className="flex flex-col md:flex-row justify-between mt-8 gap-12">
                    {/* Calendar */}
                    <div className="flex flex-col items-center w-full md:w-1/3 space-y-6">
                        <div className="text-xl font-medium text-gray-700">Select Date</div>
                        <div className="bg-gray-100 p-8 rounded-xl shadow-md w-full">
                            <Calendar
                                onChange={handleDateChange}
                                value={selectedDate}
                                minDate={new Date()}
                                className="rounded-lg border-none"
                            />
                        </div>
                    </div>
                    
                    {/* Time Slots */}
                    <div className="flex flex-col w-full md:w-2/3 space-y-8">
                        <div className="text-xl font-medium text-gray-700">Select Time Slot</div>
                        <div className="grid grid-cols-2 gap-8">
                            {Object.entries(timeSlots).map(([period, slots]) => (
                                <div key={period} className="flex flex-col w-full space-y-6">
                                    <h3 className="text-lg font-semibold text-gray-600 capitalize">{period} Slots</h3>
                                    <div className="grid grid-cols-1 gap-6">
                                        {slots.map((slot, index) => (
                                            <button
                                                key={index}
                                                onClick={() => handleSlotSelection(slot)}
                                                className={`w-full py-5 text-lg rounded-lg font-medium transition duration-300 shadow-md 
                                                    ${selectedSlot === slot ? "bg-blue-600 text-white" : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-200"}`}
                                            >
                                                {slot}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                
                {/* Confirm Button */}
                <div className="flex justify-center mt-10">
                    <button className="bg-blue-600 text-white text-xl px-10 py-5 rounded-lg shadow-lg font-semibold hover:bg-blue-700 transition duration-300">
                        Confirm Appointment
                    </button>
                </div>
            </div>
    );
}
