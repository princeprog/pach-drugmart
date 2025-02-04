import { Outlet, useNavigate } from "react-router-dom";
import { FaFacebook } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { BsTelephone } from "react-icons/bs";
import { MdOutlineLocationOn } from "react-icons/md";
import { useState, useEffect } from "react";
import { BiUser, BiLogOut } from "react-icons/bi";

export default function NavBar() {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Check if user is logged in (based on localStorage)
        const user = localStorage.getItem("userEmail");
        setIsLoggedIn(!!user);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("userEmail");
        setIsLoggedIn(false);
        navigate("/login");
    };

    return (
        <div className="nav-bar text-[#181C14]">
            <div className="text-[#181C14]">
                <div className="contact font-roboto flex justify-between items-center py-2 px-4 md:px-16 bg-[#155C9C] text-[#FFFFFF]">
                    <div className="social flex space-x-4 text-[#FFFFFF]">
                        <FaFacebook className="text-xl"/>
                        <FaSquareInstagram className="text-xl"/>
                        <FaLinkedin className="text-xl"/>
                    </div>
                    <p className="font-roboto text-[#FFFFFF] hidden md:block">PACH | DRUGMART AND MEDICAL CLINIC</p>
                    <div className="font-medium flex items-center"><BsTelephone/>CALL NOW: 0000 000 0000</div>
                </div>
                <div className="nav flex justify-between items-center border-b-1 border-gray-300 px-4 md:px-16 bg-[#FFFFFF]">
                    <div className="flex items-center w-full md:w-[50%] space-x-4">
                        <img src="/images/Wordmark.2.png" alt="Pach" className="cursor-pointer w-[5rem]" onClick={()=>navigate('/home')}/>
                        <input type="text" placeholder="Search for products" className="border-1 h-[3rem] w-full px-4 py-2 rounded-3xl border-gray-400"/>
                    </div>
                    
                    <div className="flex items-center space-x-4 text-[#181C14] transition-colors duration-300 ease-in-out">
                        <div className="flex items-center mr-12">
                            <MdOutlineLocationOn className="text-2xl"/>
                            <h1 className="font-medium"> Yellow Bell, Colon, City of Naga, Cebu</h1>
                        </div>

                        {isLoggedIn ? (
                            <div className="flex items-center space-x-4">
                                <div className="flex items-center cursor-pointer" onClick={() => navigate("/profile")}>
                                    <BiUser className="text-2xl"/>
                                    <h2 className="font-medium ml-1">My Account</h2>
                                </div>
                                <div className="flex items-center cursor-pointer" onClick={handleLogout}>
                                    <BiLogOut className="text-2xl"/>
                                    <h2 className="font-medium ml-1">Log Out</h2>
                                </div>
                            </div>
                        ) : (
                            <div className="cursor-pointer flex items-center" onClick={() => navigate("/login")}>
                                <BiUser className="text-2xl mr-1"/>
                                <div>
                                    <h2 className="font-medium">Login / Signup</h2>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="md:hidden flex items-center">
                        <button onClick={() => setIsOpen(!isOpen)} className="text-gray-500 focus:outline-none">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path>
                            </svg>
                        </button>
                    </div>
                </div>

                <div className={`navbar font-roboto px-4 md:px-16 py-4 space-x-8 font-semibold border-[#155C9C] text-[#181C14] bg-[#FFFFFF] text-sm ${isOpen ? 'block' : 'hidden'} md:flex`}>
                    <p className="text-gray-500 cursor-pointer hover:text-[#32DBBE] transition-colors duration-300 ease-in-out" onClick={()=>navigate("/drug")}>DRUG</p>
                    <p className="text-gray-500 cursor-pointer hover:text-[#32DBBE] transition-colors duration-300 ease-in-out">HEALTH & ADVICE</p>
                    <p className="text-gray-500 cursor-pointer hover:text-[#32DBBE] transition-colors duration-300 ease-in-out" onClick={()=>navigate("/about")}>ABOUT</p>
                    <p className="text-gray-500 cursor-pointer hover:text-[#32DBBE] transition-colors duration-300 ease-in-out" onClick={()=>navigate("/booking")}>BOOK</p>
                </div>
            </div>
            <Outlet/>
        </div>
    );
}