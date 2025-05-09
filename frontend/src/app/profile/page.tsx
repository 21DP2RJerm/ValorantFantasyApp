"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from 'react';
import api from 'axios';

export default function Profile() {
  const [profile, setProfile] = useState({  user: { name: '', email: '' }});
  useEffect(() => {
      const fetchProfile = async () => {
          try {
              const token = localStorage.getItem('userToken');
              console.log(token);
              if (token) {
                  const response = await api.get('http://localhost:8000/api/profile', {
                    headers: {
                      Authorization: `Bearer ${token}`,
                      Accept: "application/json",
                  },
                  });
                  setProfile(response.data.data);

              } 
          } 
          catch (error) {
            console.error("Registration failed:", error)
          }
      };

      fetchProfile();
  }, []);
  
  return (
    <div className="relative flex justify-center h-screen w-screen space bg-purple-900 ">
      <div className="absolute bg-purple-700 h-screen w-[15%] left-0 flex justify-center items-center border-r-8 border-white">
        <Image
          alt="Logo"
          width={200}
          height={200}
          src="/logo.png"
          style={{ objectFit: "contain" }}
          className="z-0 m-10 top-0 absolute"
          priority
        />
        <div className="w-50% h-50% relative flex-col justify-center items-center grid grid-cols-1">
          <Link href="/home" className="relative p-2 col-span-1 text-2xl text-white">
            Home
          </Link>
          <Link href="/leaderboard" className="relative p-2 col-span-1 text-2xl text-white">
            Leaderboard
          </Link>
          <Link href="/myteams" className="relative p-2 col-span-1 text-2xl text-white">
            My Teams
          </Link>
          <Link href="/players" className="relative p-2 col-span-1 text-2xl text-white">
            Players
          </Link>
          <Link href="/profile" className="relative p-2 col-span-1 text-2xl text-white">
            Profile
          </Link>
        </div>
      </div>

      <div className="absolute right-0 flex justify-center items-start h-full w-[85%] space bg-purple-400 pt-20">
        <div className="relative w-[70%] h-[60%] bg-purple-700 rounded-lg border-8 border-white flex flex-col">
          <div className="flex items-center p-6">
            <div className="flex-shrink-0">
              <Image
                src="/Breach_icon.png"
                alt="Logo"
                width={200}
                height={200}
                style={{ objectFit: "contain" }}
                className="rounded-full border-4 border-white"
              />
            </div>
            <div className="flex-grow ml-8">
              <div className="text-4xl text-white mb-2">{profile.user.name}</div>
              <div className="text-2xl text-white">{profile.user.email}</div>
            </div>
          </div>
          <div className="flex-grow border-t-4 border-white rounded-b-lg">
            
          </div>
        </div>
      </div>
    </div>
  )
}

