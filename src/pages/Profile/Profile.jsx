import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserEdit } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";
import { MdError } from "react-icons/md";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";

function Modal({ message, isOpen, onClose }) {
    if (!isOpen) return null;

    const isSuccess = message.toLowerCase().includes("success"); 

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }} backdrop-blur-sm>
            <div className="bg-white rounded-xl shadow-2xl w-96 p-6 text-center">
                {isSuccess ? (
                    <FaCheckCircle className="text-5xl text-green-500 mx-auto mb-4" />
                ) : (
                    <MdError className="text-5xl text-red-500 mx-auto mb-4" />
                )}
                <h3 className="text-xl font-semibold mb-4">
                    {isSuccess ? "Success" : "Error"}
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

export default function Profile() {
    const [user, setUser] = useState({
        id: "",
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        password: "",
    });

    const [modalMessage, setModalMessage] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchUserData() {
            const userEmail = localStorage.getItem("userEmail");
            if (!userEmail) {
                navigate("/login");
                return;
            }

            try {
                const response = await axios.get(`http://localhost:8080/user/profile?email=${userEmail}`);
                setUser({ ...response.data, id: response.data.userId });
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        }
        fetchUserData();
    }, [navigate]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

        if (user.password && user.password !== confirmPassword) {
            setModalMessage("Passwords do not match!");
            setIsModalOpen(true);
            return;
        }

        if (user.password && user.password.length < 8) {
            setModalMessage("Password must be at least 8 characters long.");
            setIsModalOpen(true);
            return;
        }

        const updatedUser = {
            ...user,
            password: user.password ? user.password : undefined,
        };

        try {
            const response = await axios.put(`http://localhost:8080/user/updateuser/${user.id}`, updatedUser);
            if (response.status === 200) {
                setModalMessage("Profile updated successfully!");
                setIsModalOpen(true);
                setIsEditing(false);
                setConfirmPassword("");
                setUser({ ...user, password: "" });
            } else {
                setModalMessage("Failed to update profile.");
                setIsModalOpen(true);
            }
        } catch (error) {
            console.error("Error updating profile:", error);
            setModalMessage("An error occurred while updating the profile.");
            setIsModalOpen(true);
        }
    };

    return (
        <div className="flex items-start justify-center pt-30">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">My Profile</h2>

                <form onSubmit={handleUpdate} className="space-y-4">
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={user.email}
                        disabled
                        className="h-12 px-3 w-full bg-gray-200 text-gray-500 cursor-not-allowed rounded-md focus:ring-2 focus:ring-gray-600"
                    />

                    <input
                        type="text"
                        name="phone"
                        placeholder="Phone"
                        value={user.phone}
                        disabled
                        className="h-12 px-3 w-full bg-gray-200 text-gray-500 cursor-not-allowed rounded-md focus:ring-2 focus:ring-gray-600"
                    />

                    <input
                        type="text"
                        name="firstname"
                        placeholder="First Name"
                        value={user.firstname}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className={`h-12 px-3 w-full ${!isEditing ? 'bg-gray-200 text-gray-500' : 'bg-white'} rounded-md focus:ring-2 focus:ring-gray-600`}
                    />
                    <input
                        type="text"
                        name="lastname"
                        placeholder="Last Name"
                        value={user.lastname}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className={`h-12 px-3 w-full ${!isEditing ? 'bg-gray-200 text-gray-500' : 'bg-white'} rounded-md focus:ring-2 focus:ring-gray-600`}
                    />

                    {isEditing && (
                        <>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="New Password"
                                    value={user.password}
                                    onChange={handleInputChange}
                                    className="h-12 px-3 w-full bg-white rounded-md focus:ring-2 focus:ring-gray-600"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>

                            <div className="relative">
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder="Confirm Password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="h-12 px-3 w-full bg-white rounded-md focus:ring-2 focus:ring-gray-600"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                                >
                                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </>
                    )}

                    <Modal message={modalMessage} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

                    <div className="flex justify-between mt-4">
                        <button
                            type="button"
                            className="flex items-center px-4 py-2 rounded-lg bg-gray-600 text-white hover:bg-gray-700 transition"
                            onClick={() => {
                                setIsEditing(!isEditing);
                                if (!isEditing) setConfirmPassword("");
                            }}
                        >
                            <FaUserEdit className="mr-2" />
                            {isEditing ? "Cancel" : "Edit"}
                        </button>
                        {isEditing && (
                            <button
                                type="submit"
                                className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
                            >
                                Save
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
}