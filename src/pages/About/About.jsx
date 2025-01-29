export default function About() {
    return (
        <div>
            <div className="relative bg-[url('/images/pach384.jpg')] bg-cover bg-center h-[15rem] px-16 flex flex-col justify-center">
                <div className="absolute inset-0 bg-[#BFDBE4] opacity-75"></div>
                <h1 className="relative z-10 text-2xl font-semibold text-[#155C9C]">ABOUT US</h1>
                <h1 className="relative z-10 text-5xl font-bold text-[#155C9C]">PACH</h1>
                <p className="relative z-10 text-3xl text-[#155C9C]">Drugmart and Medical Clinic</p>
            </div>
            <div className="mission px-16 py-8 bg-[#F3F4F6]">
                <div className="flex h-full">
                    <div className="w-[50%] p-4 flex flex-col justify-center">
                        <h1 className="text-3xl font-semibold text-[#155C9C]">Our MISSION</h1>
                        <p className="text-xl text-gray-700 mt-4">We are committed to providing affordable medications and compassionate care, empowering individuals to lead healthier lives.</p>
                    </div>
                    <div className="w-[50%] p-4 flex flex-col justify-center">
                        <h1 className="text-3xl font-semibold text-[#155C9C]">Our VISION</h1>
                        <p className="text-xl text-gray-700 mt-4">To ensure that quality healthcare and medicines are accessible and affordable to every individual, fostering healthier communities.</p>
                    </div>
                </div>
            </div>
            <div className="mt-8 px-16">
                <h1 className="text-3xl font-semibold text-center text-[#155C9C]">CORE VALUES</h1>
                <div className="flex justify-center items-center space-x-8 mt-8 h-[20rem]">
                    <img src="/images/Online Consul.jpg" alt="" className="w-[30rem] rounded-lg shadow-md"/>
                    <div className="h-full flex flex-col justify-center p-4 bg-[#F3F4F6] rounded-lg shadow-md">
                        <h1 className="text-xl font-semibold text-center text-[#155C9C]">Accessibility</h1>
                        <p className="text-gray-700 mt-4">Health should be within reach for everyone, regardless of circumstances.</p>
                    </div>
                </div>
                <div className="flex justify-center items-center space-x-8 mt-8 h-[20rem]">
                    <div className="h-full flex flex-col justify-center p-4 bg-[#F3F4F6] rounded-lg shadow-md">
                        <h1 className="text-xl font-semibold text-center text-[#155C9C]">Affordability</h1>
                        <p className="text-gray-700 mt-4">Providing cost-effective solutions to make healthcare more attainable.</p>
                    </div>
                    <img src="/images/pach483.jpg" alt="" className="w-[30rem] rounded-lg shadow-md"/>
                </div>
                <div className="flex justify-center items-center space-x-8 mt-8 h-[20rem]">
                    <img src="/images/On-site Consult.jpg" alt="" className="w-[30rem] rounded-lg shadow-md"/>
                    <div className="h-full flex flex-col justify-center p-4 bg-[#F3F4F6] rounded-lg shadow-md">
                        <h1 className="text-xl font-semibold text-center text-[#155C9C]">Compassion</h1>
                        <p className="text-gray-700 mt-4">Serving each individual with care, respect, and understanding.</p>
                    </div>
                </div>
                <div className="flex justify-center items-center space-x-8 mt-8 h-[20rem]">
                    <div className="h-full flex flex-col justify-center p-4 bg-[#F3F4F6] rounded-lg shadow-md">
                        <h1 className="text-xl font-semibold text-center text-[#155C9C]">Integrity</h1>
                        <p className="text-gray-700 mt-4">Upholding the highest standards of honesty and ethics in all our actions.</p>
                    </div>
                    <img src="/images/pach77.jpg" alt="" className="w-[30rem] rounded-lg shadow-md"/>
                </div>
                <div className="flex justify-center items-center space-x-8 mt-8 h-[20rem]">
                    <img src="/images/vacprog.jpg" alt="" className="w-[30rem] rounded-lg shadow-md"/>
                    <div className="h-full flex flex-col justify-center p-4 bg-[#F3F4F6] rounded-lg shadow-md">
                        <h1 className="text-xl font-semibold text-center text-[#155C9C]">Community</h1>
                        <p className="text-gray-700 mt-4">Strengthening the well-being of our communities through trusted healthcare.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}