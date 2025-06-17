"use client";

import Image from "next/image"
import React, { useState } from 'react';
import Link from "next/link";
import { useRouter } from 'next/navigation';
import api from 'axios';


export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);  
    const router = useRouter();
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")
    
        try {

          const response = await api.post(
            "http://127.0.0.1:8000/api/login",
            {
              email: email.toLowerCase(),
              password,
            },
            {
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
            },
          )
    
          console.log("Login successful:", response.data)
          localStorage.setItem("userToken", response.data.token)
          router.push("/home") 
        } catch (error) {
          console.error("Login failed:", error)
          setError(error.response?.data?.message || "Login failed, please try again.")
        }
      }
    return (
        <div className="relative flex justify-center items-center h-screen w-screen">
            <Image
                alt="Background"
                fill={true}
                src="/backgroundmain.png"
                style={{ objectFit: "cover" }}
                className="z-0"
                priority
            />

            <form className="flex flex-col items-center z-1 relative bg-purple-500 p-10 rounded-lg "onSubmit={handleLogin}>
                <Image
                  alt="Logo"
                  width={100}
                  height={100}
                  src="/logo.png"
                  style={{ objectFit: "contain" }}
                  className="z-0"
                  priority
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-12 w-64 mt-8 mb-4 rounded-lg p-4 text-zinc-950"
                    disabled={loading}  
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-12 w-64 my-4 rounded-lg p-4 text-zinc-950"
                    disabled={loading}  
                    required
                />
                <button 
                    type="submit" 
                    className=" bg-white  px-6 py-2 rounded-md hover:bg-slate-300 transition-colors text-purple-500 mt-1"
                    disabled={loading} 
                >
                    {loading ? 'Logging in...' : 'Log In'}  {}
                </button>
               
            </form>
        </div>
    )
}