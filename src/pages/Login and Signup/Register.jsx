import { useState } from "react";
import { useNavigate } from "react-router-dom"
import { FaCheckCircle } from "react-icons/fa";
import { MdError } from "react-icons/md";
import { Eye, EyeOff } from "lucide-react";

function Modal({ message, isOpen, onClose }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }} backdrop-blur-sm>
            <div className="bg-white rounded-xl shadow-2xl w-96 p-6 text-center">
                {message.includes("successfully") ? (
                    <FaCheckCircle className="text-5xl text-green-500 mx-auto mb-4" />
                ) : (
                    <MdError className="text-5xl text-red-500 mx-auto mb-4" />
                )}
                <h3 className="text-xl font-semibold mb-4">
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

export default function Register() {
    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
    });
    const navigate = useNavigate();
    const [modalMessage, setModalMessage] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showPassword, setShowPassword] = useState(false); 
    const [showConfirmPassword, setShowConfirmPassword] = useState(false); 

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const phoneValid = /^[0-9]{11}$/.test(formData.phone);
        const emailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email);
        const passwordsMatch = formData.password === formData.confirmPassword;
        const passwordValid = /^(?=.*[a-zA-Z]).{9,}$/.test(formData.password);
    
        if (!formData.firstname || !formData.lastname || !formData.email || !formData.phone || !formData.password || !formData.confirmPassword) {
            setModalMessage("Please complete all required fields.");
        } else if (!phoneValid) {
            setModalMessage("Please enter a valid phone number (11 digits).");
        } else if (!emailValid) {
            setModalMessage("Please enter a valid email address.");
        } else if (!passwordValid) {
            setModalMessage("Password must be more than 8 characters and contain at least 1 letter.");
        } else if (!passwordsMatch) {
            setModalMessage("Passwords do not match.");
        } else {
            try {
                const response = await fetch("http://localhost:8080/user/save", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formData),
                });
    
                const result = await response.text();
                console.log("Server Response:", result);
    
                if (response.ok) {
                    setModalMessage("You have successfully registered! Redirecting to login...");
                    setIsModalOpen(true);
                    setTimeout(() => {
                        setIsModalOpen(false);
                        navigate("/login");
                    }, 2000);
                    return;
                } else {
                    setModalMessage(result);  
                }
            } catch (error) {
                setModalMessage("Something went wrong. Please try again.");
            }
        }
        setIsModalOpen(true);
    };
    

    const closeModal = () => {
        setIsModalOpen(false);
        setModalMessage("");
    };

    return (
        <div className="flex items-start justify-center pt-15">
            <Modal message={modalMessage} isOpen={isModalOpen} onClose={closeModal} />

            <div className="flex w-[90%] max-w-4xl bg-gray-50 shadow-lg rounded-lg overflow-hidden">
                <div className="w-1/2 bg-blue-500 p-10 flex flex-col items-center justify-center text-white">
                    <h2 className="text-3xl font-bold mb-4">Welcome Back!</h2>
                    <p className="text-center mb-6">To keep connected with us please login with your personal info</p>
                    <button 
                        className="border border-white px-6 py-2 rounded-full hover:bg-white hover:text-blue-500 transition cursor-pointer" 
                        onClick={() => navigate("/login")}
                    >
                        Sign In
                    </button>
                </div>

                <div className="w-1/2 p-10">
                    <h2 className="text-3xl font-bold text-center mb-6">Create Account</h2>
                
                    <p className="text-center text-gray-500 mb-4">Fill in the details for registration.</p>
                    
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-2">
                            <input
                                type="text"
                                name="firstname"
                                placeholder="First Name"
                                value={formData.firstname}
                                onChange={handleInputChange}
                                className="h-12 px-3 w-full bg-gray-200 text-black placeholder-gray-400 rounded-md outline-none focus:ring-2 focus:ring-gray-600"
                            />
                            <input
                                type="text"
                                name="lastname"
                                placeholder="Last Name"
                                value={formData.lastname}
                                onChange={handleInputChange}
                                className="h-12 px-3 w-full bg-gray-200 text-black placeholder-gray-400 rounded-md outline-none focus:ring-2 focus:ring-gray-600"
                            />
                        </div>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="h-12 px-3 w-full bg-gray-200 text-black placeholder-gray-400 rounded-md outline-none focus:ring-2 focus:ring-gray-600"
                        />
                        <input
                            type="text"
                            name="phone"
                            placeholder="+63"
                            value={formData.phone}
                            onChange={handleInputChange}
                            maxLength="11"
                            className="h-12 px-3 w-full bg-gray-200 text-black placeholder-gray-400 rounded-md outline-none focus:ring-2 focus:ring-gray-600"
                        />
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}                    
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleInputChange}
                                className="h-12 px-3 w-full bg-gray-200 text-black placeholder-gray-400 rounded-md outline-none focus:ring-2 focus:ring-gray-600"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)} 
                                className="text-gray-600 absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />} {/* Toggle icons */}
                            </button>
                        </div>
                        <div className="relative">
                        <input
                                type={showConfirmPassword ? "text" : "password"}   
                                name="confirmPassword"
                                placeholder="Confirm Password"
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
                                className="h-12 px-3 w-full bg-gray-200 text-black placeholder-gray-400 rounded-md outline-none focus:ring-2 focus:ring-gray-600"
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)} 
                                className="text-gray-600 absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                            >
                                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />} {/* Toggle icons */}
                            </button>
                        </div>

                        <button type="submit" className="cursor-pointer bg-blue-500 text-white px-6 py-3 rounded-lg text-lg font-medium transition duration-300 hover:bg-blue-600 w-full">
                            Sign Up
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
