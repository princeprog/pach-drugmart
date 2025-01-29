import { useState } from "react";
import { AiOutlineCalendar } from "react-icons/ai";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export default function Booking() {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [consultationType, setConsultationType] = useState("Online");

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
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 pt-12">
            {/* Banner */}
            <div className="w-[95%] h-[35rem] bg-[url('/images/pachparm.jpg')] bg-[position:25%_68%] bg-[length:110%_auto] relative shadow-lg pl-16 rounded-3xl">
                <div className="absolute inset-0 bg-gradient-to-r from-[#155C9C] via-transparent to-transparent opacity-80 rounded-3xl"></div>
                <h1 className="text-white text-5xl font-bold absolute bottom-50 left-11 z-10">Book Your</h1>
                <h1 className="text-white text-5xl font-bold absolute bottom-38 left-11 z-10">Consultation Today</h1>
            </div>
            
            <div className="bg-white rounded-3xl shadow-xl w-[90%] max-w-5xl p-14 space-y-12 mt-12">
                <h2 className="text-4xl font-bold text-center text-gray-800">Book Your Appointment</h2>
                <p className="text-center text-lg text-gray-500">Select a date, time slot, and consultation type for your appointment</p>
                
                {/* Consultation Type Selection */}
                <div className="flex justify-center gap-6">
                    <button 
                        className={`px-6 py-3 rounded-lg font-medium transition duration-300 ${consultationType === "Online" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"}`}
                        onClick={() => setConsultationType("Online")}
                    >
                        Online Consultation
                    </button>
                    <button 
                        className={`px-6 py-3 rounded-lg font-medium transition duration-300 ${consultationType === "Onsite" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"}`}
                        onClick={() => setConsultationType("Onsite")}
                    >
                        Onsite Consultation
                    </button>
                </div>
                
                <div className="flex flex-col md:flex-row justify-between mt-8 gap-12">
                    {/* Calendar Section */}
                    <div className="flex flex-col items-center w-full md:w-1/2 space-y-6">
                        {/* Title */}
                        <div className="text-2xl font-semibold text-gray-800">
                            Select Date
                        </div>

                        {/* Calendar Container */}
                        <div className="bg-gradient-to-b from-blue-100 to-blue-50 p-8 rounded-2xl shadow-lg w-full border border-blue-300 transition-all duration-300 hover:shadow-xl">
                            <Calendar
                                onChange={handleDateChange}
                                value={selectedDate}
                                minDate={new Date()}
                                className="rounded-lg border-none bg-white shadow-md p-4"
                            />
                        </div>
                    </div>

                    {/* Time Slots Section */}
                    <div className="flex flex-col w-full md:w-2/3 space-y-6">
                        {/* Title */}
                        <div className="text-2xl font-semibold text-gray-800">
                            Select Time Slot
                        </div>

                        {/* Time Slot Buttons */}
                        <div className="grid grid-cols-2 gap-8">
                            {Object.entries(timeSlots).map(([period, slots]) => (
                                <div key={period} className="flex flex-col w-full space-y-6">
                                    <h3 className="text-lg font-semibold text-gray-600 capitalize">{period} Slots</h3>
                                    <div className="grid grid-cols-1 gap-6">
                                        {slots.map((slot, index) => (
                                            <button
                                                key={index}
                                                onClick={() => handleSlotSelection(slot)}
                                                className={`w-full py-5 text-lg rounded-2xl font-medium transition duration-300 shadow-lg border border-blue-300 
                                                    ${
                                                        selectedSlot === slot
                                                            ? "bg-blue-600 text-white"
                                                            : "bg-gradient-to-b from-white to-blue-50 text-gray-700 hover:bg-blue-100"
                                                    }`}
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
        </div>
    );
}
