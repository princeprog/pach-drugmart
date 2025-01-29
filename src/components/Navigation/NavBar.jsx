import { Outlet, useNavigate } from "react-router-dom";
import { FaFacebook } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { CiUser } from "react-icons/ci";
import { BsTelephone } from "react-icons/bs";





export default function NavBar() {

    const navigate = useNavigate();

    return (
        <div className="nav-bar">
            <div className="">
                <div className="contact flex justify-between items-center py-2 px-16 bg-[#001A6E] text-white">
                    <div className="social flex space-x-4">
                        <FaFacebook className="text-xl text-white"/>
                        <FaSquareInstagram className="text-xl text-white"/>
                        <FaLinkedin className="text-xl text-white"/>
                    </div>
                    <p className="font-medium text-white font-sans ">PACH | DRUGMART AND MEDICAL CLINIC</p>
                    <div className="font-medium text-white flex items-center"><BsTelephone/>CALL NOW: 0000 000 0000</div>
                </div>
                <div className="nav flex justify-between items-center border-b-1 border-gray-300 px-16 bg-[#155C9C]">
                    <img src="./images/Wordmark_BW.png" alt="" className="w-[12rem] cursor-pointer" onClick={()=> navigate("/home")}/>
                    <input type="text" placeholder="Search for products" className="border-2 flex-grow mx-20 rounded h-[2.5rem] px-4 bg-gray-200 border-gray-300 border-opacity-10 rounded-2xl"/>
                    <div className="text-white flex items-center space-x-4 cursor-pointer hover:text-[#5CB338] transition-colors duration-300 ease-in-out" onClick={
                        () => navigate("/login")
                    }>
                        <CiUser className="text-4xl text-white"/>
                        <div>
                            <h2 className="font-bold text-white">Account</h2>
                            <p className="text-xs text-white">Login / Register</p>
                        </div>
                    </div>
                </div>
                <div className="px-16 flex py-4 space-x-8 border-b-3 border-[#155C9C] font-medium text-[#213555] bg-[#155C9C]">
                    <p className="cursor-pointer hover:text-[#32DBBE] transition-colors duration-300 ease-in-out text-white">SHOP</p>
                    <p className="cursor-pointer hover:text-[#32DBBE] transition-colors duration-300 ease-in-out text-white">HEALTH & ADVICE</p>
                    <p className="cursor-pointer hover:text-[#32DBBE] transition-colors duration-300 ease-in-out text-white"
                        onClick={()=>navigate("/about")}
                    >ABOUT</p>
                    <p className="cursor-pointer hover:text-[#32DBBE] transition-colors duration-300 ease-in-out text-white"
                        onClick={()=>navigate("/booking")}
                    >BOOK</p>
                    <p className="cursor-pointer hover:text-[#32DBBE] transition-colors duration-300 ease-in-out text-white"
                        onClick={()=>navigate("/contact")}
                    >CONTACT</p>
                    
                </div>
            </div>
            <Outlet/>
        </div>
    )
}