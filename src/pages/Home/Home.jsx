import { useNavigate } from "react-router-dom";
import { AiOutlineMail } from "react-icons/ai";
import { BsTelephone } from "react-icons/bs";


export default function Home() {
    const navigate = useNavigate();

    return (
        <div className="home">
            <section className="bg-[#FFFFFF] text-black h-screen flex items-center justify-between">
                <div className="pl-16">
                    <h1 className="text-5xl text-[#000957] font-bold font-montserrat my-2">Your source of</h1>
                    <h1 className="text-5xl text-[#000957] font-bold font-montserrat my-2"> cost effective </h1>
                    <h1 className="text-5xl font-bold text-[#155C9C] font-montserrat my-2">healthcare</h1>
                    <p className="pt-4 font-roboto2">At PACH, we provide affordable medications and <br />compassionate care, ensuring quality healthcare <br />
                        is accessible to all for healthier lives and communities.</p>
                    <p className="mt-8 font-montserrat2">Book an online consultation our experts via Google Meet.</p>
                    <button className="border-1 w-[10rem] py-2 rounded-3xl mt-4 bg-[#155C9C] font-montserrat2 text-white">BOOK NOW</button>
                </div>
                <div className="relative w-[60%] h-full">
                    <img src="/images/fortagline.jpg" alt="" className="w-full h-full object-cover" />
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-white via-transparent to-transparent opacity-100"></div>
                </div>
            </section>
            <section className="h-fit bg-[#155C9C] px-16 py-8 flex flex-col items-center">
                <div className="w-fit rounded-2xl px-4 py-1 mb-2 bg-[#32DBBE] text-white font-montserrat">SERVICES</div>
                <h1 className="text-center text-white text-3xl font-montserrat">Explore our trusted health services,</h1>
                <h1 className="text-center text-white text-2xl font-montserrat">all in one place.</h1>
                <div className="services mt-8 grid grid-cols-4 gap-8 justify-center h-screen">
                    <div className=" max-w-sm rounded overflow-hidden shadow-2xl h-fit transform transition duration-300 hover:scale-105">
                        <img className="w-full" src="./images/Blood Pressure.jpg" alt="Blood Pressure" />
                        <div className="px-6 py-4 bg-[#FFFFFF]">
                            <div className="text-xl mt-4 font-medium text-[#213555]">Blood Pressure</div>
                        </div>
                    </div>

                    <div className="max-w-sm rounded overflow-hidden shadow-2xl h-fit transform transition duration-300 hover:scale-105">
                        <img className="w-full" src="./images/CBS Test (Blood Sugar Test).jpg" alt="CBS Test" />
                        <div className="px-6 py-4 bg-[#FFFFFF]">
                            <div className="text-xl mt-4 font-medium text-[#213555]">CBS Test</div>
                        </div>
                    </div>

                    <div className="max-w-sm rounded overflow-hidden shadow-2xl h-fit transform transition duration-300 hover:scale-105">
                        <img className="w-full" src="./images/Electrocardiography.jpg" alt="Electrocardiography" />
                        <div className="px-6 py-4 bg-[#FFFFFF]">
                            <div className="text-xl mt-4 font-medium text-[#213555]">Electrocardiography</div>
                        </div>
                    </div>

                    <div className="max-w-sm rounded overflow-hidden shadow-2xl h-fit transform transition duration-300 hover:scale-105">
                        <img className="w-full" src="./images/On-site Consult.jpg" alt="On-site Consult" />
                        <div className="px-6 py-4 bg-[#FFFFFF]">
                            <div className="text-xl mt-4 font-medium text-[#213555]">On-site Consultation</div>
                        </div>
                    </div>

                    <div className="max-w-sm rounded overflow-hidden shadow-2xl h-fit transform transition duration-300 hover:scale-105">
                        <img className="w-full" src="./images/Online Consul.jpg" alt="Online Consult" />
                        <div className="px-6 py-4 bg-[#FFFFFF]">
                            <div className="text-xl mt-4 font-medium text-[#213555]">Online Consultation</div>
                        </div>
                    </div>

                    <div className="max-w-sm rounded overflow-hidden shadow-2xl h-fit transform transition duration-300 hover:scale-105">
                        <img className="w-full" src="./images/Online Pharmacy.jpg" alt="Online Pharmacy" />
                        <div className="px-6 py-4 bg-[#FFFFFF]">
                            <div className="text-xl mt-4 font-medium text-[#213555]">Online Pharmacy</div>
                        </div>
                    </div>

                    <div className="max-w-sm rounded overflow-hidden shadow-2xl h-fit transform transition duration-300 hover:scale-105">
                        <img className="w-full" src="./images/Shipping & Delivery.jpg" alt="Shipping & Delivery" />
                        <div className="px-6 py-4 bg-[#FFFFFF]">
                            <div className="text-xl mt-4 font-medium text-[#213555]">Shipping & Delivery</div>
                        </div>
                    </div>

                    <div className="max-w-sm rounded overflow-hidden shadow-2xl h-fit transform transition duration-300 hover:scale-105">
                        <img className="w-full" src="./images/Vaccination Program.jpg" alt="Vaccination Program" />
                        <div className="px-6 py-4 bg-[#FFFFFF]">
                            <div className="text-xl mt-4 font-medium text-[#213555]">Vaccination Program</div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="px-16 py-8 bg-[#FFFFFF] h-fit">
                <div className="mt-8 p-4 flex w-full">
                    <div className="w-[50%] p-4 flex flex-col">
                        <h1 className="text-5xl font-bold text-[#155C9C]">Support and Inquiries</h1>
                        <p className="mt-8 text-lg text-gray-700">Have questions about our products, prescriptions, or orders? We're here to help! Fill out the form below, and our team will get back to you as soon as possible. Whether you need assistance with a purchase, have a medical inquiry, or just want to share feedback, we’re happy to assist. Your health and convenience are our priority!</p>
                        <p className="flex items-center underline mt-8"><AiOutlineMail className="text-xl mr-2" /> pachdrugmart1@gmail.com</p>
                        <p className="flex items-center mt-4 underline"><BsTelephone className="mr-2" />PACH Climaco - 09171403349</p>
                        <p className="flex items-center mt-4 underline"><BsTelephone className="mr-2" />PACH Kaya - 09171862245
                        </p>
                    </div>
                    <div className="w-[50%] p-4">
                        <form className="w-full h-full flex flex-col justify-between bg-white p-8 rounded-lg shadow-lg">
                            <div>
                                <div className="flex justify-between w-full mb-4">
                                    <input type="text" placeholder="*First Name" className="border border-gray-300 rounded px-4 py-2 w-[48%] focus:outline-none focus:ring-2 focus:ring-[#155C9C]" />
                                    <input type="text" placeholder="*Last Name" className="border border-gray-300 rounded px-4 py-2 w-[48%] focus:outline-none focus:ring-2 focus:ring-[#155C9C]" />
                                </div>
                                <div className="mb-4">
                                    <input type="email" placeholder="*Email" className="border border-gray-300 rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-[#155C9C]" />
                                </div>
                                <div className="mb-4">
                                    <input type="tel" placeholder="*Phone Number" className="border border-gray-300 rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-[#155C9C]" />
                                </div>
                                <div className="mb-4">
                                    <input type="text" placeholder="*Subject" className="border border-gray-300 rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-[#155C9C]" />
                                </div>
                                <div className="mb-4">
                                    <textarea placeholder="*Message" className="border border-gray-300 rounded w-full h-[12rem] px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#155C9C]"></textarea>
                                </div>
                            </div>
                            <button className="py-2 bg-[#155C9C] w-full text-white font-medium rounded hover:bg-[#0D3A5C] transition duration-300">Submit</button>
                        </form>
                    </div>
                </div>
            </section>
            <footer className="bg-[#155C9C] text-white p-8 flex justify-between items-center px-16">
                <div>
                    <img src="/images/Wordmark_BW.png" alt="" className="w-[15rem]" />
                    <p className="ml-4 font-roboto">Drugmart and Medical Clinic</p>
                </div>
                <div>
                    <p className="font-montserrat2 my-2 cursor-pointer hover:underline">HOME</p>
                    <p className="font-montserrat2 my-2 cursor-pointer hover:underline">ABOUT</p>
                    <p className="font-montserrat2 my-2 cursor-pointer hover:underline">DRUG</p>
                    <p className="font-montserrat2 my-2 cursor-pointer hover:underline">BOOK</p>
                </div>
            </footer>
        </div>
    );
}