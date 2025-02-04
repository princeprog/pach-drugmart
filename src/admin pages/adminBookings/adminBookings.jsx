import { useState, useEffect } from "react";
import axios from "axios";

export default function AdminBookings() {
    const [bookings, setBookings] = useState([]);
    const [filteredBookings, setFilteredBookings] = useState([]);
    const [dateFilter, setDateFilter] = useState("");
    const [searchQuery, setSearchQuery] = useState(""); 

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        try {
            const response = await axios.get("http://localhost:8080/consultation/getallconsultations");
            setBookings(response.data);
            setFilteredBookings(response.data);
        } catch (error) {
            console.error("Error fetching bookings:", error.message || error);
        }
    };

    const handleDateFilterChange = (e) => {
        const filter = e.target.value;
        setDateFilter(filter);
        applyFilters(filter, searchQuery);
    };

    const handleSearchChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        applyFilters(dateFilter, query);
    };

    const applyFilters = (date, query) => {
        let filtered = bookings;

        if (date) {
            filtered = filtered.filter((booking) => {
                const bookingDate = new Date(booking.consultationDate);
                const filterDate = new Date(date);
                return bookingDate.toISOString().split("T")[0] === filterDate.toISOString().split("T")[0];
            });
        }

        if (query) {
            filtered = filtered.filter((booking) => {
                const clientName = `${booking.user.firstname} ${booking.user.lastname}`.toLowerCase();
                return clientName.includes(query.toLowerCase());
            });
        }

        setFilteredBookings(filtered);
    };

    const clearFilters = () => {
        setDateFilter("");
        setSearchQuery("");
        setFilteredBookings(bookings);
    };

    const formatTime = (time) => {
        const [hours, minutes] = time.split(":");
        const date = new Date();
        date.setHours(hours, minutes);
        return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true });
    };

    return (
        <div className="flex flex-col w-full min-h-screen bg-gray-50">
            <div className="flex flex-col items-center justify-start pt-6 pb-10 px-4">
                <h2 className="text-4xl font-bold text-center text-gray-800 mb-6">Admin - Manage Bookings</h2>

                {/* Filter Section */}
                <div className="flex gap-4 mb-8 w-full max-w-4xl">
                    <div className="flex flex-col w-full">
                        <label htmlFor="dateFilter" className="text-lg mb-2 text-gray-700">Date Filter</label>
                        <input
                            type="date"
                            id="dateFilter"
                            value={dateFilter}
                            onChange={handleDateFilterChange}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="flex flex-col w-full">
                        <label htmlFor="nameSearch" className="text-lg mb-2 text-gray-700">Search by Name</label>
                        <input
                            type="text"
                            id="nameSearch"
                            value={searchQuery}
                            onChange={handleSearchChange}
                            placeholder="Search by client name"
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Clear Filters Button */}
                    <div className="pt-9 flex flex-col w-20">
                        <button
                            onClick={clearFilters}
                            className="px-5 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                        >
                            Clear
                        </button>
                    </div>
                </div>

                {/* Bookings Table */}
                <div className="w-full max-w-5xl p-6 bg-white rounded-xl shadow-md">
                    <div className="overflow-x-auto max-h-[65vh]">
                        <table className="w-full table-auto text-sm rounded-lg border-collapse border border-gray-300">
                            <thead className="bg-[#155C9C] sticky top-0 z-10">
                                <tr>
                                    <th className="px-6 py-6 text-xl text-left font-semibold text-white border-b border-gray-300">Client Name</th>
                                    <th className="px-6 py-4 text-xl text-left font-semibold text-white border-b border-gray-300">Date</th>
                                    <th className="px-6 py-4 text-xl text-left font-semibold text-white border-b border-gray-300">Time</th>
                                    <th className="px-6 py-4 text-xl text-left font-semibold text-white border-b border-gray-300">Consultation Type</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredBookings.length > 0 ? (
                                    filteredBookings.map((booking, index) => (
                                        <tr key={booking.id} className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-gray-200 transition-colors duration-200`}>
                                            <td className="px-6 py-4 border-b border-gray-200">{`${booking.user.firstname} ${booking.user.lastname}`}</td>
                                            <td className="px-6 py-4 border-b border-gray-200">{new Date(booking.consultationDate).toLocaleDateString()}</td>
                                            <td className="px-6 py-4 border-b border-gray-200">{formatTime(booking.consultationTime)}</td>
                                            <td className="px-6 py-4 border-b border-gray-200">{booking.googleMeetLink ? "Online" : "Onsite"}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4" className="px-6 py-4 text-center text-gray-600 border-b border-gray-200">No bookings available</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
} 
