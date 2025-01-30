import { useState, useEffect } from "react";
import { AiOutlineCalendar } from "react-icons/ai";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { FaCheckCircle } from "react-icons/fa";
import { MdError } from "react-icons/md";
import axios from "axios";

function Modal({ message, isOpen, onClose }) {
    useEffect(() => {
        if (isOpen) {
            document.body.classList.add("overflow-hidden");
        } else {
            document.body.classList.remove("overflow-hidden");
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm">
            <div className="bg-white rounded-xl shadow-[0_10px_20px_rgba(0,0,0,0.4)] w-96 p-6 text-center">
                {message.includes("successfully") ? (
                    <FaCheckCircle className="text-6xl text-green-500 mx-auto mb-4" />
                ) : (
                    <MdError className="text-6xl text-red-500 mx-auto mb-4" />
                )}
                <h3 className="text-2xl font-bold mb-4">
                    {message.includes("successfully") ? "Success" : "Error"}
                </h3>
                <p className="text-gray-700 mb-6">{message}</p>
                <button
                    onClick={onClose}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg transition duration-300 hover:bg-blue-700"
                >
                    Close
                </button>
            </div>
        </div>
    );
}    

export default function Booking() {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [consultationType, setConsultationType] = useState("Online");
    const [contactDetails, setContactDetails] = useState({
        firstName: "",
        lastName: "",
        middleName: "",
        suffix: "",
        email: "",
        phone: "",
        message: "",
    });
    const [modalMessage, setModalMessage] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    const timeSlots = {
        morning: ["8:00 AM - 9:00 AM", "9:00 AM - 10:00 AM", "10:00 AM - 11:00 AM", "11:00 AM - 12:00 PM"],
        afternoon: ["1:00 PM - 2:00 PM", "2:00 PM - 3:00 PM", "3:00 PM - 4:00 PM", "4:00 PM - 5:00 PM"],
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
        setSelectedSlot(null);
    };

    const handleSlotSelection = (slot) => {
        setSelectedSlot(slot);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setContactDetails({ ...contactDetails, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const phoneValid = /^[0-9]{11}$/.test(contactDetails.phone);
        const emailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(contactDetails.email);
        const suffixValid = /^(Jr|Sr|II|III|IV|V)$/.test(contactDetails.suffix);

        if (!contactDetails.firstName || !contactDetails.lastName || !contactDetails.email || !contactDetails.phone || !selectedSlot) {
            setModalMessage("Please complete all required fields.");
        } else if (!phoneValid) {
            setModalMessage("Please enter a valid phone number (11 digits).");
        } else if (!emailValid) {
            setModalMessage("Please enter a valid email address.");
        } else if (contactDetails.suffix && !suffixValid) {
            setModalMessage("Please enter a valid suffix (e.g., Jr, Sr, II, III).");
        } else {
            setModalMessage(
                consultationType === "Online"
                    ? "Your online consultation appointment has successfully been sent. Please wait for email approval and the meeting link."
                    : "Your onsite consultation appointment has successfully been sent. Please wait for email approval and further details."
            );
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setModalMessage("");
    };
 
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white pt-2 pb-10">
            {/* Modal */}
           
            <Modal FaCheckCircle message={modalMessage} isOpen={isModalOpen} onClose={closeModal} />
 
            {/* Banner */}
            <div className="w-[95%] h-[35rem] bg-[url('/images/pachparm.jpg')] bg-[position:25%_68%] bg-[length:110%_auto] relative shadow-lg pl-16 rounded-3xl">
                <div className="absolute inset-0 bg-gradient-to-r from-[#155C9C] via-transparent to-transparent opacity-80 rounded-3xl"></div>
                <h1 className="text-white text-5xl font-bold absolute bottom-50 left-11 z-10">
                    Book Your
                </h1>
                <h1 className="text-white text-5xl font-bold absolute bottom-38 left-11 z-10">
                    Consultation Today
                </h1>
            </div>
 
            {/* Booking Form */}
            <div className="bg-[#e0e0e0] rounded-3xl shadow-[0px_8px_24px_rgba(0,0,0,0.3)] w-[90%] max-w-5xl p-14 space-y-12 mt-12">
                <h2 className="text-4xl font-bold text-center text-gray-800">Book Your Appointment</h2>
                <p className="text-center text-lg text-gray-500">
                    Select a date, time slot, and consultation type for your appointment
                </p>
 
                {/* Consultation Type Selection */}
                <div className="flex justify-center gap-6">
                    <button
                        className={`cursor-pointer px-6 py-3 rounded-lg font-medium transition duration-300 ${
                            consultationType === "Online"
                                ? "bg-blue-600 text-white"
                                : "bg-gray-200 text-gray-700"
                        }`}
                        onClick={() => setConsultationType("Online")}
                    >
                        Online Consultation
                    </button>
                    <button
                        className={`cursor-pointer px-6 py-3 rounded-lg font-medium transition duration-300 ${
                            consultationType === "Onsite"
                                ? "bg-blue-600 text-white"
                                : "bg-gray-200 text-gray-700"
                        }`}
                        onClick={() => setConsultationType("Onsite")}
                    >
                        Onsite Consultation
                    </button>
                </div>
 
                {/* Date and Time Selection */}
                <div className="flex flex-col md:flex-row justify-between gap-5">
                    {/* Calendar Section */}
                    <div className="flex flex-col items-center w-full md:w-1/2 space-y-12">
                        <div className="text-2xl font-semibold text-black-300">Select Date</div>
                        <div className="bg-gradient-to-b p-8 rounded-2xl w-full">
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
                        <div className="text-2xl font-semibold text-gray-800">Select Time Slot</div>
                        <div className="grid grid-cols-2 gap-8">
                            {Object.entries(timeSlots).map(([period, slots]) => (
                                <div key={period} className="flex flex-col w-full space-y-6">
                                    <h3 className="text-lg font-semibold text-gray-600 capitalize">
                                        {period} Slots
                                    </h3>
                                    <div className="grid grid-cols-1 gap-3">
                                        {slots.map((slot, index) => (
                                            <button
                                                key={index}
                                                onClick={() => handleSlotSelection(slot)}
                                                className={`cursor-pointer w-full py-5 text-lg rounded-2xl font-medium transition duration-300 shadow-lg border border-black-300 ${
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
 
                {/* Contact Form */}
                <div className="flex flex-col space-y-5">
                    <h2 className="text-2xl text-center font-semibold text-gray-800">Contact Details</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <input
                            type="text"
                            name="firstName"
                            placeholder="*First Name"
                            value={contactDetails.firstName}
                            onChange={handleInputChange}
                            className="p-4 border rounded-lg w-full"
                        />
                        <input
                            type="text"
                            name="lastName"
                            placeholder="*Last Name"
                            value={contactDetails.lastName}
                            onChange={handleInputChange}
                            className="p-4 border rounded-lg w-full"
                        />
                        <input
                            type="text"
                            name="middleName"
                            placeholder="Middle Name"
                            value={contactDetails.middleName}
                            onChange={handleInputChange}
                            className="p-4 border rounded-lg w-full"
                        />
                       <input
                            type="text"
                            name="suffix"
                            placeholder="Suffix (Jr, Sr, etc.)"
                            value={contactDetails.suffix}
                            onChange={handleInputChange}
                            className="p-4 border rounded-lg w-full"
                            pattern="^(Jr|Sr|II|III|IV|V)$"
                            title="Please enter a valid suffix (e.g., Jr, Sr, II, III)"
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="*Email"
                            value={contactDetails.email}
                            onChange={handleInputChange}
                            className="p-4 border rounded-lg w-full"
                        />
                        <input
                            type="text"
                            name="phone"
                            placeholder="*Phone Number"
                            value={contactDetails.phone}
                            onChange={handleInputChange}
                            className="p-4 border rounded-lg w-full"
                            pattern="[0-9]{11}"
                            inputMode="numeric"
                            title="Please enter a valid phone number"
                        />
                    </div>
                    <textarea
                        name="message"
                        placeholder="Message/Consultation Details"
                        value={contactDetails.message}
                        onChange={handleInputChange}
                        className="p-4 border rounded-lg w-full"
                        rows="4"
                    ></textarea>
                </div>
 
                <div className="flex justify-center mt-6">
                    <button
                        onClick={handleSubmit}
                        className="align-center cursor-pointer bg-blue-600 text-white py-4 rounded-lg w-80 text-lg font-medium transition duration-300 hover:bg-blue-700"
                    >
                        Book Appointment
                    </button>
                </div>
            </div>
        </div>
    );
}