


export default function Register() {
    return (
        <div className="flex justify-center items-center mt-15">
             <div className="bg-gray-100 p-8 rounded-md">
             <h1 className="text-3xl font-medium text-[#213555]">Register Account</h1>
            <form>
                <div className="flex flex-col mt-4">
                    <label className="font-semibold text-gray-500">First Name <span className="text-red-500">*</span></label>
                    <input type="text" placeholder="First Name" className="rounded bg-gray-200 w-[25rem] px-4 py-2"/>
                </div>
                <div className="flex flex-col mt-4">
                    <label className="font-semibold text-gray-500">Last Name <span className="text-red-500">*</span></label>
                    <input type="text" placeholder="Last Name" className="rounded bg-gray-200 w-[25rem] px-4 py-2"/>
                </div>
                <div className="flex flex-col mt-4">
                    <label className="font-semibold text-gray-500">Email<span className="text-red-500">*</span></label>
                    <input type="text" placeholder="Email" className="rounded bg-gray-200 w-[25rem] px-4 py-2"/>
                </div>
                <div className="flex flex-col mt-4">
                    <label className="font-semibold text-gray-500">Phone Number <span className="text-red-500">*</span></label>
                    <input type="text" placeholder="Phone Number" className="rounded bg-gray-200 w-[25rem] px-4 py-2"/>
                </div>
                <div className="flex flex-col mt-4">
                    <label className="font-semibold text-gray-500">Password <span className="text-red-500">*</span></label>
                    <input type="text" placeholder="Password" className="rounded bg-gray-200 w-[25rem] px-4 py-2"/>
                </div>
                <button className="font-medium mt-8 w-[25rem] p-2.5 rounded-md bg-[#5CB338] text-white">Create Account</button>
            </form>
             </div>
        </div>
    )
}