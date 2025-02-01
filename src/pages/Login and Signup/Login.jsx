import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import { MdError } from "react-icons/md";
import { Eye, EyeOff } from "lucide-react";
import axios from 'axios';

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

export default function Login() {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [modalMessage, setModalMessage] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showPassword, setShowPassword] = useState(false); 
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate input fields
        if (!formData.email || !formData.password) {
            setModalMessage("Please complete all required fields.");
            setIsModalOpen(true);
            return;
        }

        // Email regex validation
        const emailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email);
        if (!emailValid) {
            setModalMessage("Please enter a valid email address.");
            setIsModalOpen(true);
            return;
        }

        try {
            const response = await axios.post('http://localhost:8080/user/login', formData);
            if (response.status === 200) {
                setModalMessage("Login successful! Redirecting...");
                setIsModalOpen(true);

                localStorage.setItem('userEmail', formData.email);
                
                window.location.href = "/home";

                // setTimeout(() => {
                //     navigate("/home");
                // }, 2000);
            } else {
                setModalMessage("Invalid email or password.");
                setIsModalOpen(true);
            }
        } catch (error) {
            console.error("Login failed:", error);
            setModalMessage("Invalid email or password.");
            setIsModalOpen(true);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setModalMessage("");
    };

    return (
        <div className="flex items-start justify-center pt-30">
            <Modal message={modalMessage} isOpen={isModalOpen} onClose={closeModal} />

            <div className="flex w-[90%] max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="w-1/2 p-10">
                    <h2 className="text-3xl font-bold text-center mb-6">Login to Your Account</h2>
                    <p className="text-center text-gray-500 mb-4">Fill in your details to login.</p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            value={formData.email}
                            onChange={handleChange}
                            className="h-12 px-3 w-full bg-gray-200 text-black placeholder-gray-400 rounded-md outline-none focus:ring-2 focus:ring-gray-600"
                        />
                        
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"} // Toggle between text and password type
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                                className="h-12 px-3 w-full bg-gray-200 text-black placeholder-gray-400 rounded-md outline-none focus:ring-2 focus:ring-gray-600"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)} // Toggle password visibility
                                className="text-gray-600 absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />} {/* Toggle icons */}
                            </button>
                        </div>
                        
                        <p className="mt-4 text-blue-500 underline text-center cursor-pointer">Forgot password?</p>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-6 py-3 rounded-lg text-lg font-medium transition duration-300 hover:bg-blue-600 w-full cursor-pointer"
                        >
                            Sign In
                        </button>
                    </form>
                </div>

                {/* Right Side - Styled Panel */}
                <div className="w-1/2 bg-blue-500 p-10 flex flex-col items-center justify-center text-white">
                    <div className="w-fit p-4 flex flex-col justify-between">
                        <h2 className="text-3xl font-bold mb-4 text-center">Hello my Friend!</h2>
                        <h1 className="text-xl font-medium text-center">New Customer</h1>
                        <p className="mt-4 text-lg text-justify">
                            By creating an account you will be able to shop faster, be up to date on an order's status, and keep track of the orders you have previously made.
                        </p>
                    </div>

                    <button
                        className="mt-2 border border-white px-6 py-2 rounded-full hover:bg-white hover:text-blue-500 transition cursor-pointer"
                        onClick={() => navigate("/register")}
                    >
                        Sign Up
                    </button>
                </div>
            </div>
        </div>
    );
}
