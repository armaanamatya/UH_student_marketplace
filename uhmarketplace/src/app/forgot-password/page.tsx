"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";  // Import axios for making API requests

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const router = useRouter();

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Basic validation for email
        if (!email) {
            setError("Please enter your email address.");
            return;
        }

        try {
            // Make API call to send password reset link
            const response = await axios.post("/api/auth/forgot-password", { email });
            
            // Handle success
            if (response.status === 200) {
                setSuccess("A password reset link has been sent to your email.");
                setError("");  // Clear any existing errors
            }
        } catch (err) {
            console.error("API Error:", err);
            setError("There was an issue with your request. Please try again.");
            setSuccess(""); // Clear any existing success messages
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 bg-cover bg-center"
            style={{ backgroundImage: "url('/thecollegetouruniversityofhouston_opengraph.jpg')" }}>
            <div className="flex w-full max-w-md bg-white rounded-lg shadow-lg p-8">
                <div className="w-full">
                    <h1 className="text-3xl font-semibold mb-6">Forgot Password</h1>

                    {/* Display error message if any */}
                    {error && <p className="text-red-500 mb-4">{error}</p>}

                    {/* Display success message if any */}
                    {success && <p className="text-green-500 mb-4">{success}</p>}

                    <form onSubmit={handleSubmit}>
                        <label htmlFor="email" className="block mb-2 font-medium">Email</label>
                        <input
                            className="w-full p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-blue-600"
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                        />

                        <button
                            type="submit"
                            className="w-full py-2 mb-4 text-white bg-blue-600 rounded-lg flex justify-center items-center hover:bg-blue-700 transition duration-300"
                        >
                            Send Password Reset Link
                        </button>
                    </form>

                    <div className="text-center">
                        <button
                            onClick={() => router.push("/login")}
                            className="text-blue-600 hover:underline"
                        >
                            Back to Login
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
