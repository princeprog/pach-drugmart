import { Outlet, useNavigate } from "react-router-dom";
import { FaFacebook } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { CiUser } from "react-icons/ci";
import { BsTelephone } from "react-icons/bs";
import { MdOutlineLocationOn } from "react-icons/md";






export default function NavBar() {

    const navigate = useNavigate();

    return (
        <div className="nav-bar text-[#181C14]">
            <div className="text-[#181C14]">
                <div className="contact flex justify-between items-center py-2 px-16 bg-[#155C9C] text-[#FFFFFF]">
                    <div className="social flex space-x-4 text-[#FFFFFF]">
                        <FaFacebook className="text-xl"/>
                        <FaSquareInstagram className="text-xl"/>
                        <FaLinkedin className="text-xl"/>
                    </div>
                    <p className="font-medium font-sans text-[#FFFFFF]">PACH | DRUGMART AND MEDICAL CLINIC</p>
                    <div className="font-medium flex items-center"><BsTelephone/>CALL NOW: 0000 000 0000</div>
                </div>
                <div className="nav flex justify-between items-center border-b-1 border-gray-300 px-16 bg-[#FFFFFF]">
                    <div className="flex items-center w-[50%] space-x-4">
                        <img src="/images/Wordmark.2.png" alt="Pach" className="w-[5rem]"/>
                        <input type="text" placeholder="Search for products" className="border-1 h-[3rem] w-full px-4 py-2 rounded-3xl"/>
                    </div>
                    <div className="flex items-center space-x-4 text-[#181C14] transition-colors duration-300 ease-in-out" >
                        <div className="flex items-center mr-12">
                            <MdOutlineLocationOn className="text-2xl"/>
                            <h1 className=" font-medium t"> Yellow Bell, Colon, City of Naga, Cebu</h1>
                        </div>
                        <CiUser className="text-4xl cursor-pointer"  onClick={
                            () => navigate("/login")
                        }/>
                        <div className="cursor-pointer" onClick={
                            () => navigate("/login")
                        }>
                            <h2 className="font-bold">Account</h2>
                            <p className="text-xs">Login / Register</p>
                        </div>
                    </div>
                </div>
                <div className="px-16 flex py-4 space-x-8 font-semibold border-[#155C9C] text-[#181C14] bg-[#FFFFFF] text-sm">
                    <p className="cursor-pointer hover:text-[#32DBBE] transition-colors duration-300 ease-in-out">SHOP</p>
                    <p className="cursor-pointer hover:text-[#32DBBE] transition-colors duration-300 ease-in-out">HEALTH & ADVICE</p>
                    <p className="cursor-pointer hover:text-[#32DBBE] transition-colors duration-300 ease-in-out"
                        onClick={()=>navigate("/about")}
                    >ABOUT</p>
                    <p className="cursor-pointer hover:text-[#32DBBE] transition-colors duration-300 ease-in-out"
                        onClick={()=>navigate("/booking")}
                    >BOOK</p>
                    <p className="cursor-pointer hover:text-[#32DBBE] transition-colors duration-300 ease-in-out"
                        onClick={()=>navigate("/contact")}
                    >CONTACT</p>
                    
                </div>
            </div>
            <Outlet/>
        </div>
    )
}