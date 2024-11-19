"use client";

import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

// exporting the default function loginPage for other parts of the program
export default function LoginPage() {

    // UseRouter is a hook that programatically lets you navigate through pages --> Router as in routing 
    const router = useRouter();

    // useState is a react Hook that sets up for the LoginPage component
    // You initialize email and password for user
    const [user, setUser] = React.useState({
        email: "",
        password: "",
    });

    // Using useState to initialize error
    const [error, setError] = React.useState("");

    // async operation when logging in
    const handleLogin = async () => {
        // Basic validation
        if (!user.email || !user.password) {
            // If one of the fields is missing, return a custom error
            setError("Please fill out both fields.");
            return;
        }

        try {
            // Instead of axios here, it is sending the request over to the nextauth authentication
            const response = await signIn('credentials', {
                email: user.email,
                password: user.password,
                redirect: true,
                callbackUrl: '/'
            } )
            console.log("API Response:", response); // Log the successful response
            if (response?.status === 200) {
                // I put this to route back to the homepage but its up to yall
                router.push("/");
            }
        } catch (err) {
            console.log("API Error:", err); // Log the error for debugging
            setError("Invalid email or password.");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 bg-cover bg-center"
            style={{ backgroundImage: "url('/thecollegetouruniversityofhouston_opengraph.jpg')" }}>
            <div className="flex w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-shadow duration-300">

                {/* Left Side - Image */}
                <div className="w-1/2 hidden md:flex items-center justify-center bg-gray-200">
                    <img
                        src="/Login-pic-testing.jpg"  // Ensure this image is in the /public folder
                        alt="University of Houston Logo"
                        className="object-cover w-full h-full"
                    />
                </div>

                {/* Right Side - Form */}
                <div className="w-full md:w-1/2 p-8" style={{ backgroundColor: 'white' }}>
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
                        className="w-full py-2 mb-4 text-white rounded-lg flex justify-center items-center hover:bg-red-500 transition duration-300"
                        style={{ backgroundColor: 'rgb(37, 99, 235)' }} // Use Tailwind's blue color directly
                    >
                        Login
                    </button>

                    <div className="text-center">
                        <Link href="/signup" className="text-blue-600 hover:underline">
                            Don’t have an account? Sign up here.
                        </Link>
                    </div>

                    {/* Forgot Password Link */}
                    <div className="text-center mt-4">
                        <Link href="/forgot-password" className="text-blue-600 hover:underline">
                            Forgot password?
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
