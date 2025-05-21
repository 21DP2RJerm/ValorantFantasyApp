"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from 'react';
import api from 'axios';
import Navigation from "../navigation";

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
          catch (error: any) {
            if (error.response) {
              console.error("Error response:", error.response.data);
            }
            console.error("Registration failed:", error);
          }

      };

      fetchProfile();
  }, []);
  
  return (
    <div className="relative flex justify-center h-screen w-screen space bg-purple-900 ">
      <Navigation/>

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

