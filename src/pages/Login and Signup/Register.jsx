import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    return (
        <div className="flex justify-center items-center mt-2">
            <div className="bg-gray-100 p-8 rounded-md w-[50rem]">
                <h1 className="text-3xl font-medium text-[#213555] text-left">Register Account</h1>
                <form>
                    <div className="grid grid-cols-2 gap-4 mt-11 ml-6">
                        {/* First Name */}
                        <div className="flex flex-col">
                            <label className="font-semibold text-gray-500">First Name <span className="text-red-500">*</span></label>
                            <input type="text" placeholder="First Name" className="rounded bg-gray-200 px-4 py-2"/>
                        </div>

                        {/* Last Name */}
                        <div className="flex flex-col">
                            <label className="font-semibold text-gray-500">Last Name <span className="text-red-500">*</span></label>
                            <input type="text" placeholder="Last Name" className="rounded bg-gray-200 px-4 py-2"/>
                        </div>

                        {/* Email */}
                        <div className="flex flex-col">
                            <label className="font-semibold text-gray-500">Email <span className="text-red-500">*</span></label>
                            <input type="email" placeholder="Email" className="rounded bg-gray-200 px-4 py-2"/>
                        </div>

                        {/* Phone Number */}
                        <div className="flex flex-col">
                            <label className="font-semibold text-gray-500">Phone Number <span className="text-red-500">*</span></label>
                            <input type="text" placeholder="Phone Number" className="rounded bg-gray-200 px-4 py-2"/>
                        </div>

                        {/* Password */}
                        <div className="flex flex-col relative">
                            <label className="font-semibold text-gray-500">Password <span className="text-red-500">*</span></label>
                            <div className="relative">
                                <input 
                                    type={showPassword ? "text" : "password"} 
                                    placeholder="Password" 
                                    className="rounded bg-gray-200 px-4 py-2 w-full pr-10"
                                />
                                {/* Show/Hide Button */}
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
                            <label className="font-semibold text-gray-500">Confirm Password <span className="text-red-500">*</span></label>
                            <div className="relative">
                                <input 
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder="Password"
                                    className="rounded bg-gray-200 px-4 py-2 w-full pr-10"
                                />
                                {/* Show/Hide Button */}
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
                        <button className="cursor-pointer font-medium w-full p-2.5 
                        rounded-md bg-[#155C9C] text-white transition-transform 
                        ease-in-out duration:300 hover:scale-105">Create Account</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
