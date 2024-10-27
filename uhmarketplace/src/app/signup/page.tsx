"use client";

import Link from "next/link";
import React, {useEffect} from "react";
import {useRouter} from "next/navigation"
import axios from "axios"
import toast, { Toaster } from 'react-hot-toast';
import router from "next/router";


export default function signupPage(){
    const [user,setUser] = React.useState({
        email:"",
        password:"",
        username:""
    })
    const [buttonDisabled, setButtonDisbabled] = React.useState(false);

    useEffect(() => {
        if(user.email.length > 0 && user.password.length > 0 &&user.username.length > 0){
            setButtonDisbabled(false);
        } else {
            setButtonDisbabled(true);
        }
    },[user])


    const [loading,setloading] = React.useState(false);
    const onSignup = async () => {
        try{
            setloading(true);
            const response = await axios.post("/api/users/signup",user)
            console.log('sign up success', response.data)
            router.push('/login')
        }catch (error:any){
            console.log("Signup Failed")
            toast.error(error.message)
        }finally {
            setloading(false)
        }
    }


    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className=""> Signup</h1>
            <hr />
            <label htmlFor="username">username</label>
            <input 
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                id="username"
                type="text"
                value = {user.username}
                onChange={(e) => setUser({...user, username: e.target.value})}
                placeholder="username"/>

            <label htmlFor="password">password</label>
            <input 
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                id="password"
                type="password"
                value = {user.password}
                onChange={(e) => setUser({...user, password: e.target.value})}
                placeholder="password"/>

            <label htmlFor="email">email</label>
            <input 
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                id="email"
                type="text"
                value = {user.email}
                onChange={(e) => setUser({...user, email: e.target.value})}
                placeholder="email"/>
            <button 
            onClick={onSignup}
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">{buttonDisabled ? "No Sign up" : "Sign up"}</button>
            <Link href="/login"> Visit Login Page</Link>
            
        </div>
    )
}