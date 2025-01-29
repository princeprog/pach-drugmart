import { useNavigate } from "react-router-dom"

export default function Login() {
    const navigate = useNavigate();
    return(
        <div className="px-32 mt-8">
            <div className="bg-gray-100 p-8 rounded-md">
                <h1 className="text-3xl font-medium text-[#213555]">Account Login</h1>
                <div className="mt-8 flex space-x-8">
                    <div className="w-fit p-4 flex flex-col justify-between">
                        <div>
                            <h1 className="text-xl text-[#213555] font-medium">New Customer</h1>
                            <p className="text-[#213555] mt-4 text-lg">By creating an account you <br />will be able to shop faster, be <br /> up to date on an order's <br />status, and keep track of the <br />orders you have previously made.</p>
                        </div>
                        <button className="font-medium mt-8 w-full p-2 rounded-md bg-[#5CB338] text-white cursor-pointer" onClick={
                            () => navigate("/register")
                        }>Create Account</button>
                    </div>
                    <div className="w-fit p-4">
                        <h1 className="text-xl text-[#213555] font-medium">Returning Customer</h1>
                        <div className="flex flex-col mt-4">
                            <label>E-Mail Address</label>
                            <input type="text" placeholder="E-Mail Address" className="rounded-md bg-gray-200 px-4 py-2"/>
                        </div>
                        <div className="flex flex-col mt-4">
                            <label>Password</label>
                            <input type="text" placeholder="Password" className="rounded-md bg-gray-200 px-4 py-2"/>
                        </div>
                        <p className="mt-4 text-[#5CB338] underline cursor-pointer">Forgotten password</p>
                        <button className="font-medium mt-8 w-full p-2 rounded-md bg-[#5CB338] text-white">Login</button>
                    </div>
                </div>
            </div>
        </div>
    )
}