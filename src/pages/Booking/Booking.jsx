import { useState, useEffect } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { MdError } from "react-icons/md";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
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
    const [bookedTimes, setBookedTimes] = useState([]); // New state for booked times

    const timeSlots = {
        morning: ["8:00 AM - 9:00 AM", "9:00 AM - 10:00 AM", "10:00 AM - 11:00 AM", "11:00 AM - 12:00 PM"],
        afternoon: ["1:00 PM - 2:00 PM", "2:00 PM - 3:00 PM", "3:00 PM - 4:00 PM", "4:00 PM - 5:00 PM"],
    };



    const handleDateChange = (date) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0); 

        if (date < today) {
            setSelectedDate(today);
            setModalMessage("You cannot book an appointment for past dates.");
            setIsModalOpen(true);
        } else {
            setSelectedDate(date);
            setSelectedSlot(null);
            fetchBookedTimes(date);
        }
    };
    


    const fetchBookedTimes = async (date) => {
        try {
            if (isNaN(date)) {
                throw new Error('Invalid date');
            }

            const dateString = date.toISOString().split("T")[0];  // Format 'YYYY-MM-DD'

            const response = await axios.get(`http://localhost:8080/consultation/getBookedTimes/${dateString}`);

            setBookedTimes(response.data);
        } catch (error) {
            console.error("Error fetching booked times:", error.message || error);
        }
    };


    const handleSlotSelection = (slot) => {
        if (bookedTimes.includes(formatTime(slot))) {
            return;
        }
        setSelectedSlot(slot);
    };


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setContactDetails({ ...contactDetails, [name]: value });
    };


    const formatTime = (time) => {
        const [hour, minute, period] = time.split(/[:\s]/);
        let hour24 = parseInt(hour, 10);
        if (period === "PM" && hour24 !== 12) {
            hour24 += 12;
        } else if (period === "AM" && hour24 === 12) {
            hour24 = 0;
        }
        return `${hour24.toString().padStart(2, "0")}:${minute}:00`; // Converts "8:00 AM" to "08:00:00"
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        const phoneValid = /^[0-9]{11}$/.test(contactDetails.phone);
        const emailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(contactDetails.email);
        const suffixValid = /^(Jr|Sr|II|III|IV|V)$/.test(contactDetails.suffix);
    
        // Validation checks
        if (!contactDetails.firstName || !contactDetails.lastName || !contactDetails.email || !contactDetails.phone || !selectedSlot) {
            setModalMessage("Please complete all required fields.");
            setIsModalOpen(true);
        } else if (!phoneValid) {
            setModalMessage("Please enter a valid phone number (11 digits).");
            setIsModalOpen(true);
        } else if (!emailValid) {
            setModalMessage("Please enter a valid email address.");
            setIsModalOpen(true);
        } else if (contactDetails.suffix && !suffixValid) {
            setModalMessage("Please enter a valid suffix (e.g., Jr, Sr, II, III).");
            setIsModalOpen(true);
        } else {
            const consultationData = {
                consultationDate: selectedDate.toISOString().split("T")[0], // Format date
                consultationTime: formatTime(selectedSlot.split(" - ")[0]), // Format time to 24-hour format (HH:mm:ss)
                googleMeetLink: consultationType === "Online" ? "https://meet.google.com/example" : null,
                user: {
                    userId: 1, // This can be dynamic if the user is logged in
                    firstname: contactDetails.firstName,
                    lastname: contactDetails.lastName,
                    email: contactDetails.email,
                    phone: contactDetails.phone,
                },
            };
    
            axios
                .post("http://localhost:8080/consultation/save", consultationData)
                .then((response) => {
                    setModalMessage(
                        consultationType === "Online"
                            ? "Your online consultation appointment has successfully been sent. Please wait for email approval and the meeting link."
                            : "Your onsite consultation appointment has successfully been sent. Please wait for email approval and further details."
                    );
                    setIsModalOpen(true);
    
                    setContactDetails({
                        firstName: "",
                        lastName: "",
                        middleName: "",
                        suffix: "",
                        email: "",
                        phone: "",
                        message: "",
                    });
                    setSelectedSlot(null);
                    setSelectedDate(new Date());
                })
                .catch((error) => {
                    setModalMessage("There was an error while saving your consultation. Please try again.");
                    setIsModalOpen(true);
                });
        }
    };
    

    const closeModal = () => {
        setIsModalOpen(false);
        setModalMessage("");
    };

    
    useEffect(() => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        setSelectedDate(today);
        fetchBookedTimes(today);
    }, []);


    useEffect(() => {
        if (selectedDate) {
            fetchBookedTimes(selectedDate);
        }
    }, [selectedDate]);
    

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white pt-2 pb-10">
            {/* Modal */}
            <Modal message={modalMessage} isOpen={isModalOpen} onClose={closeModal} />

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
            <div className="bg-[#e0e0e0] rounded-3xl shadow-[0px_8px_24px_rgba(0,0,0,0.3)] w-[90%] max-w-5xl p-14 space-y-7 mt-12">
                <h2 className="text-4xl font-bold text-center text-gray-800">Book Your Consultation</h2>
                <p className="text-center text-lg text-gray-500">
                    Select a date, time slot, and consultation type for your appointment
                </p>

                {/* Consultation Type Selection */}
                <div className="flex justify-center gap-10">
                    <button
                        className={`cursor-pointer px-6 py-3 border border-black shadow-lg rounded-lg font-medium transition duration-300 ${
                            consultationType === "Online"
                                ? "bg-blue-600 text-white"
                                : "bg-gray-200 text-gray-700"
                        }`}
                        onClick={() => setConsultationType("Online")}
                    > 
                        Online Consultation
                    </button>
                    <button
                        className={`cursor-pointer px-6 py-3 border border-black shadow-lg rounded-lg font-medium transition duration-300 ${
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
                <div className="flex flex-col md:flex-row justify-between gap-8">
                    <div className="w-full md:w-1/2">
                    <Calendar onChange={handleDateChange} value={selectedDate} className="rounded-3xl shadow-lg"/>
                    </div>

                    {/* Time Slots */}
                    <div className="w-full md:w-1/2 flex flex-col gap-6">
                        <h3 className="text-xl font-semibold text-Black-700">Available Time Slots</h3>
                        <div className="space-y-4">
                            {["morning", "afternoon"].map((period) => (
                                <div key={period}>
                                    <h4 className="text-lg font-medium text-Black-700">{period === "morning" ? "Morning:" : "Afternoon:"}</h4>
                                    <div className="grid grid-cols-2 gap-4">
                                        {timeSlots[period].map((slot) => {
                                            const isBooked = bookedTimes.includes(formatTime(slot));
                                            return (
                                                <button
                                                    key={slot}
                                                    className={`w-full py-2 px-4 rounded-lg border-2 transition duration-300 ${
                                                        selectedSlot === slot
                                                            ? "bg-blue-600 text-white border-blue-600 cursor-pointer"
                                                            : isBooked
                                                            ? "bg-red-600 text-white cursor-not-allowed"
                                                            : "bg-white text-gray-700 hover:bg-gray-100 cursor-pointer"
                                                    }`}
                                                    disabled={isBooked}
                                                    onClick={() => handleSlotSelection(slot)}
                                                    title={isBooked ? "Booked" : "Available"} // Tooltip on hover
                                                >
                                                    {slot}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Contact Form */}
                <div className="flex flex-col gap-4">
                <h3 className="flex justify-center text-xl font-semibold text-Black-700">Contact Details: </h3>
                    <input
                        type="text"
                        name="firstName"
                        value={contactDetails.firstName}
                        onChange={handleInputChange}
                        placeholder="First Name"
                        className="px-6 py-3 border border-black-300 rounded-lg"
                    />
                    <input
                        type="text"
                        name="lastName"
                        value={contactDetails.lastName}
                        onChange={handleInputChange}
                        placeholder="Last Name"
                        className="px-6 py-3 border border-black-300 rounded-lg"
                    />
                    <input
                        type="email"
                        name="email"
                        value={contactDetails.email}
                        onChange={handleInputChange}
                        placeholder="Email"
                        className="px-6 py-3 border border-black-300 rounded-lg"
                    />
                    <input
                        type="text"
                        name="phone"
                        value={contactDetails.phone}
                        onChange={handleInputChange}
                        placeholder="Phone (11 digits)"
                        className="px-6 py-3 border border-black-300 rounded-lg"
                    />
                    <textarea
                        name="message"
                        value={contactDetails.message}
                        onChange={handleInputChange}
                        placeholder="Message (optional)"
                        className="px-6 py-3 border border-black-300 rounded-lg"
                    />
                </div>

                {/* Submit Button */}
                <div className="flex justify-center">
                    <button
                        onClick={handleSubmit}
                        className="cursor-pointer mt-8 bg-blue-600 text-white py-3 px-8 rounded-xl transition duration-300 hover:bg-blue-700"
                    >
                        Book Appointment
                    </button>
                </div>
            </div>
        </div>
    );
}
