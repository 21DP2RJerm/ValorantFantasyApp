"use client";

import Image from "next/image"
import React, { useState } from 'react';
import Link from "next/link";
import { useRouter } from 'next/navigation';
import api from 'axios';

export default function Login() {
    const router = useRouter();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState<string | boolean>(false);

    const validateEmail = (email: string) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
      };
    

      const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")
    
        try {

          const response = await api.post(
            "http://127.0.0.1:8000/api/register",
            {
              name,
              email: email.toLowerCase(),
              password,
              password_confirmation: confirmPassword,
            },
            {
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
            },
          )
    
          console.log("Registration successful:", response.data)
          localStorage.setItem("userToken", response.data.token)
          router.push("/login")
        } catch (error) {
          console.error("Registration failed:", error)
          setError(error.response?.data?.message || "Registration failed, please try again.")
        }
      }
    

    return (
        <div className="relative flex justify-center items-center h-screen w-screen space ">

            <Image
                alt="Background"
                fill={true}
                src="/backgroundmain.png"
                style={{ objectFit: "cover" }}
                className="z-0"
                priority
            />
            <Image
                alt="Breach"
                width={1000}
                height={100}
                src="/breach.webp"
                style={{ objectFit: "contain" }}
                className="z-0 absolute left-[10%] "
                priority
            />
            <form className="flex flex-col items-center z-1 w-[20%] bg-purple-500 p-10 rounded-lg absolute right-[30%]" onSubmit={handleRegister}>

                <Image
                        alt="Logo"
                        width={100}
                        height={100}
                        src="/logo.png"
                        style={{ objectFit: "contain" }}
                        className="z-0"
                        priority
                />
                  {error && (
                    <div className="bg-red-100 border relative text-center border-red-400 text-red-700 px-4 py-3 rounded mb-4 w-[100%]">{error}</div>
                  )}
                <input
                    type="username"
                    name="name"
                    placeholder="Enter your username"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="h-12 w-64 mt-8 rounded-lg p-4 text-zinc-950" 
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-12 w-64 mt-8 mb-4 rounded-lg p-4 text-zinc-950" 
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-12 w-64 my-4 rounded-lg p-4 text-zinc-950" 
                    required
                />
                <input
                    type="password"
                    name="confirm-password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="h-12 w-64 my-4 rounded-lg p-4 text-zinc-950"
                    required
                />
                <div className="mb-4">
                    <Link href="/login" className="text-main-blue">
                    Log in instead
                    </Link>
                </div>
                <button 
                    type="submit" 
                    className=" bg-white  px-6 py-2 rounded-md hover:bg-slate-300 transition-colors text-purple-500 mt-1"
                >
                Sign up
                </button>
               
            </form>
        </div>
    )
}