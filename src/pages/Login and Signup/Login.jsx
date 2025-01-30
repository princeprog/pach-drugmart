import { useNavigate } from "react-router-dom"
import { useState } from "react";

export default function Login() {
    const [loginData, setLoginData] = useState ({
        email: "",
        password: ""
    });

    const navigate = useNavigate();

    const [error, setError] = useState(null);
    
    const handleChange = (e) => {
        setLoginData({...loginData, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:8080/user/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: loginData.email,
                    password: loginData.password
                })
            });

    if (response.ok) {
                const user = await response.json();
                alert("Login successful!");

                // Store user data (or JWT token) in local storage
                localStorage.setItem("user", JSON.stringify(user));

                // Redirect to dashboard or home page
                // window.location.href = "/dashboard";
            } else {
                setError("Invalid email or password");
            }
        } catch (error) {
            console.error("Error:", error);
            setError("An error occurred. Please try again.");
        }
    };


    return( 
        <div className="flex justify-center items-center mt-2">
            <div className="bg-gray-100 p-8 rounded-md">
                <h1 className="text-3xl font-medium text-[#213555]">Account Login</h1>

                <div className="mt-8 flex space-x-8">
                    <div className="w-fit p-4 flex flex-col justify-between">
                        <div>
                            <h1 className="text-xl text-[#213555] font-medium">New Customer</h1>
                            <p className="text-[#213555] mt-4 text-lg">By creating an account you <br />will be able to shop faster, be <br /> up to date on an order's <br />status, and keep track of the <br />orders you have previously made.</p>
                        </div>
                        <button className="cursor-pointer font-medium mt-6 w-full p-2.5 
                        rounded-md bg-[#155C9C] text-white transition-transform 
                        ease-in-out duration:300 hover:scale-105" onClick={
                            () => navigate("/register")
                        }>Create Account</button>
                    </div>

                    <div className="w-fit p-4">
                        <h1 className="text-xl text-[#213555] font-medium">Returning Customer</h1>
                        <form onSubmit={handleSubmit}>
                            <div className="flex flex-col mt-4 w-80">
                                <label>E-Mail Address</label>
                                <input 
                                    type="email" 
                                    name="email"
                                    value={loginData.email}
                                    onChange={handleChange}
                                    placeholder="Enter email address" 
                                    className="rounded-md bg-gray-200 px-4 py-2"
                                    required
                                />
                            </div>
                            <div className="flex flex-col mt-4">
                                <label>Password</label>
                                <input 
                                    type="password"
                                    name="password"
                                    value={loginData.password}
                                    onChange={handleChange}
                                    placeholder="Enter password" 
                                    className="rounded-md bg-gray-200 px-4 py-2"
                                    required
                                />
                            </div>
                            <p className="mt-4 text-[#32DBBE] underline cursor-pointer">Forgot password?</p>

                            {error && <p className="text-red-500">{error}</p>}

                            <button type="submit" className="cursor-pointer font-medium mt-6 w-full p-2.5 
                            rounded-md bg-[#155C9C] text-white transition-transform 
                            ease-in-out duration-300 hover:scale-105">Login</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}