import React from 'react';

export default function AdminLogin() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#BFDBE4]">
            <div className="bg-[#FFFFFF] p-8 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center text-[#155C9C]">Admin Login</h2>
                <form>
                    <div className="mb-4">
                        <label className="block text-[#155C9C] text-sm font-bold mb-2" htmlFor="username">
                            Username
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="username"
                            type="text"
                            placeholder="Username"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-[#155C9C] text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            id="password"
                            type="password"
                            placeholder="******************"
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            className="bg-[#32DBBE] hover:bg-[#155C9C] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="button"
                        >
                            Sign In
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}