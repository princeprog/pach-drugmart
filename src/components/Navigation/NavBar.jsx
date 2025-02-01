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
                <div className="contact font-roboto flex justify-between items-center py-2 px-16 bg-[#155C9C] text-[#FFFFFF]">
                    <div className="social flex space-x-4 text-[#FFFFFF]">
                        <FaFacebook className="text-xl"/>
                        <FaSquareInstagram className="text-xl"/>
                        <FaLinkedin className="text-xl"/>
                    </div>
                    <p className="font-roboto text-[#FFFFFF]">PACH | DRUGMART AND MEDICAL CLINIC</p>
                    <div className="font-medium flex items-center"><BsTelephone/>CALL NOW: 0000 000 0000</div>
                </div>
                <div className="nav flex justify-between items-center border-b-1 border-gray-300 px-16 bg-[#FFFFFF]">
                    <div className="flex items-center w-[50%] space-x-4">
                        <img src="/images/Wordmark.2.png" alt="Pach" className="cursor-pointer w-[5rem]" onClick={()=>navigate('/home')}/>
                        <input type="text" placeholder="Search for products" className="border-1 h-[3rem] w-full px-4 py-2 rounded-3xl"/>
                    </div>
                    <div className="flex items-center space-x-4 text-[#181C14] transition-colors duration-300 ease-in-out font-roboto" >
                        <div className="flex items-center mr-12">
                            <MdOutlineLocationOn className="text-gray-500 text-2xl"/>
                            <h1 className="font-roboto text-gray-500"> Yellow Bell, Colon, City of Naga, Cebu</h1>
                        </div>
                        <CiUser className="text-gray-500 text-4xl cursor-pointer"  onClick={
                            () => navigate("/login")
                        }/>
                        <div className="cursor-pointer" onClick={
                            () => navigate("/login")
                        }>
                            <h2 className="text-gray-500 font-bold">Account</h2>
                            <p className="text-gray-500 text-xs">Login / Register</p>
                        </div>
                    </div>
                </div>
                <div className="navbar font-roboto px-16 flex py-4 space-x-8 font-semibold border-[#155C9C] text-[#181C14] bg-[#FFFFFF] text-sm ">
                    <p className="text-gray-500 cursor-pointer hover:text-[#32DBBE] transition-colors duration-300 ease-in-out"
                        onClick={()=>navigate("/drug")}
                    >DRUG</p>
                    <p className="text-gray-500 cursor-pointer hover:text-[#32DBBE] transition-colors duration-300 ease-in-out">HEALTH & ADVICE</p>
                    <p className="text-gray-500 cursor-pointer hover:text-[#32DBBE] transition-colors duration-300 ease-in-out"
                        onClick={()=>navigate("/about")}
                    >ABOUT</p>
                    <p className="text-gray-500 cursor-pointer hover:text-[#32DBBE] transition-colors duration-300 ease-in-out"
                        onClick={()=>navigate("/booking")}
                    >BOOK</p>
                    
                </div>
            </div>
            <Outlet/>
        </div>
    )
}