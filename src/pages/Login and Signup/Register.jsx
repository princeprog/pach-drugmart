import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function Register() {
    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: ""
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // Handle input change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        try {
            const response = await fetch("http://localhost:8080/user/save", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    firstname: formData.firstname,
                    lastname: formData.lastname,
                    email: formData.email,
                    phone: formData.phone,
                    password: formData.password
                })
            });

            if (response.ok) {
                alert("Registration successful!");
                setFormData({
                    firstname: "",
                    lastname: "",
                    email: "",
                    phone: "",
                    password: "",
                    confirmPassword: ""
                });
            } else {
                alert("Registration failed. Please try again.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred. Please try again.");
        }
    };

    return (
        <div className="flex justify-center items-center mt-2">
            <div className="bg-gray-100 p-8 rounded-md w-[50rem]">
                <h1 className="text-3xl font-medium text-[#213555] text-left">Register Account</h1>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-2 gap-4 mt-11 ml-6">
                        {/* First Name */}
                        <div className="flex flex-col">
                            <label className="font-semibold text-gray-500">First Name *</label>
                            <input 
                                type="text" 
                                name="firstname"
                                value={formData.firstname}
                                onChange={handleChange}
                                placeholder="First Name" 
                                className="rounded bg-gray-200 px-4 py-2"
                                required
                            />
                        </div>

                        {/* Last Name */}
                        <div className="flex flex-col">
                            <label className="font-semibold text-gray-500">Last Name *</label>
                            <input 
                                type="text"
                                name="lastname"
                                value={formData.lastname}
                                onChange={handleChange}
                                placeholder="Last Name"
                                className="rounded bg-gray-200 px-4 py-2"
                                required
                            />
                        </div>

                        {/* Email */}
                        <div className="flex flex-col">
                            <label className="font-semibold text-gray-500">Email *</label>
                            <input 
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Email"
                                className="rounded bg-gray-200 px-4 py-2"
                                required
                            />
                        </div>

                        {/* Phone Number */}
                        <div className="flex flex-col">
                            <label className="font-semibold text-gray-500">Phone Number *</label>
                            <input 
                                type="text"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="+63 (0000-000-0000)"
                                className="rounded bg-gray-200 px-4 py-2"
                                required
                            />
                        </div>

                        {/* Password */}
                        <div className="flex flex-col relative">
                            <label className="font-semibold text-gray-500">Password *</label>
                            <div className="relative">
                                <input 
                                    type={showPassword ? "text" : "password"} 
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Password" 
                                    className="rounded bg-gray-200 px-4 py-2 w-full pr-10"
                                    required
                                />
                                <button 
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="cursor-pointer absolute inset-y-0 right-3 flex items-center text-gray-500"
                                >
                                    {showPassword ? <EyeOff size={20}/> : <Eye size={20}/>}
                                </button>
                            </div>
                        </div>

                        {/* Confirm Password */}
                        <div className="flex flex-col">
                            <label className="font-semibold text-gray-500">Confirm Password *</label>
                            <div className="relative">
                                <input 
                                    type={showConfirmPassword ? "text" : "password"}
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    placeholder="Confirm Password"
                                    className="rounded bg-gray-200 px-4 py-2 w-full pr-10"
                                    required
                                />
                                <button 
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="cursor-pointer absolute inset-y-0 right-3 flex items-center text-gray-500"
                                >
                                    {showConfirmPassword ? <EyeOff size={20}/> : <Eye size={20}/>}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Create Account Button */}
                    <div className="flex justify-center mt-8 ml-6">
                        <button 
                            type="submit"
                            className="cursor-pointer font-medium w-full p-2.5 rounded-md bg-[#155C9C] text-white transition-transform 
                            ease-in-out duration-300 hover:scale-105"
                        >
                            Create Account
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
