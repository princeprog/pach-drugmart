import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { CiEdit } from "react-icons/ci";
import { AiOutlineDashboard } from "react-icons/ai";
import { RiProductHuntLine } from "react-icons/ri";
import { RiCalendarScheduleLine } from "react-icons/ri";
import { BiSolidPurchaseTag } from "react-icons/bi";
import { FaUser } from "react-icons/fa";
import { IoIosSettings } from "react-icons/io";

export default function Sidebar() {
    const [activeItem, setActiveItem] = useState("Dashboard");
    const navigate = useNavigate();

    const handleItemClick = (item) => {
        setActiveItem(item);
        if(item === "Dashboard"){
            navigate("dashboard");
        } else if(item === "Products"){
            navigate("products");
        }else if(item === "Schedule"){
            navigate("schedule");
        }else if(item === "Messages"){
            navigate("messages");
        }else if(item === "User Management"){
            navigate("user-management");
        }
    };

    const getItemClass = (item) => {
        return `text-white font-medium mt-2 flex items-center cursor-pointer pl-12 py-2 ${
            activeItem === item ? "bg-[#0D3A5C] border-l-2" : ""
        }`;
    };

    return (
        <div className="flex">
            <div className="sidebar w-[20rem] bg-[#155C9C] h-screen flex flex-col items-center">
                <div className="mt-8 flex flex-col items-center p-4">
                    <h1 className="text-sm text-white">Admin</h1>
                    <img src="/images/admin.png" alt="" className="w-[7rem]" />
                    <p className="text-xl text-white">Admin Name</p>
                    <p className="mt-4 flex items-center text-white text-sm opacity-50">EDIT PROFILE<CiEdit /></p>
                </div>
                <div className="w-full">
                    <div className={getItemClass("Dashboard")} onClick={() => handleItemClick("Dashboard")}><AiOutlineDashboard className="mr-2 text-lg" />Dashboard</div>
                    <div className={getItemClass("Products")} onClick={() => handleItemClick("Products")}><RiProductHuntLine className="mr-2 text-lg" />Products</div>
                    <div className={getItemClass("Consultations")} onClick={() => handleItemClick("Schedule")}><RiCalendarScheduleLine className="mr-2 text-lg" />Schedules</div>
                    <div className={getItemClass("Orders & Payments")} onClick={() => handleItemClick("Messages")}><BiSolidPurchaseTag className="mr-2 text-lg" />Messages</div>
                    <div className={getItemClass("User Management")} onClick={() => handleItemClick("User Management")}><FaUser className="mr-2 text-lg" />User Management</div>
                    <div className={getItemClass("Settings")} onClick={() => handleItemClick("Settings")}><IoIosSettings className="mr-2 text-lg" />Settings</div>
                </div>
            </div>
            <Outlet />
        </div>
    );
}