"use client";

import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";  // Note: Import 'axios' properly

export default function LoginPage() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
    });
    const [error, setError] = React.useState("");

    const handleLogin = async () => {
        // Basic validation
        if (!user.email || !user.password) {
            setError("Please fill out both fields.");
            return;
        }

        try {
            const response = await axios.post("/api/auth/login", user);  // Adjust API endpoint if needed
            if (response.status === 200) {
                router.push("/dashboard");  // Redirect on successful login
            }
        } catch (err) {
            setError("Invalid email or password.");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="flex w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden">
                
                {/* Left Side - Image */}
                <div className="w-1/2 hidden md:flex items-center justify-center bg-gray-200">
                    <img
                        src="/Login-pic-testing.jpg"  // Ensure this image is in the /public folder
                        alt="University of Houston Logo"
                        className="object-cover w-full h-full"
                    />
                </div>
                
                {/* Divider Line */}
                <div className="w-1 border-r border-gray-300"></div>
                
                {/* Right Side - Form */}
                <div className="w-full md:w-1/2 p-8">
                    <h1 className="text-3xl font-semibold mb-6">Login</h1>
                    {error && <p className="text-red-500 mb-4">{error}</p>}
                    
                    <label htmlFor="email" className="block mb-2 font-medium">Email</label>
                    <input
                        className="w-full p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-blue-600"
                        id="email"
                        type="email"
                        value={user.email}
                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                        placeholder="Email"
                    />

                    <label htmlFor="password" className="block mb-2 font-medium">Password</label>
                    <input
                        className="w-full p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-blue-600"
                        id="password"
                        type="password"
                        value={user.password}
                        onChange={(e) => setUser({ ...user, password: e.target.value })}
                        placeholder="Password"
                    />

                    <button
                        onClick={handleLogin}
                        className="w-full py-2 mb-4 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                    >
                        Login
                    </button>

                    <div className="text-center">
                        <Link href="/signup" className="text-blue-600 hover:underline">
                            Don’t have an account? Sign up here.
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
