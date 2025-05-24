"use client"

import Image from "next/image"
import Link from "next/link"
import api from "axios"
import { useEffect, useState } from "react"

export default function Navigation() {
  const [admin, setAdmin] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("userToken")
        if (token) {
          const response = await api.get("http://localhost:8000/api/profile", {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          })
          // Set the admin status from the user object
          setAdmin(response.data.data.user.admin)
          console.log(response.data.data.user.admin)
        }
      } catch (error: any) {
        if (error.response) {
          console.error("Error response:", error.response.data)
        }
        console.error("Profile fetch failed:", error)
      } finally {
        // Set loading to false regardless of success or failure
        setLoading(false)
      }
    }

    fetchProfile()
  }, [])

  // Return null when loading
  if (loading) {
    return(
        <div className="absolute bg-purple-900 h-screen w-[15%] left-0 flex justify-center items-center border-r-8 border-white">
            <Image
            alt="Logo"
            width={200}
            height={200}
            src="/logo.png"
            style={{ objectFit: "contain" }}
            className="z-0 m-10 top-0 absolute"
            priority
            />
        </div>
    )
  }

  return (
    <div className="absolute bg-purple-900 h-screen w-[15%] left-0 flex justify-center items-center border-r-8 border-white">
      <Image
        alt="Logo"
        width={200}
        height={200}
        src="/logo.png"
        style={{ objectFit: "contain" }}
        className="z-0 m-10 top-0 absolute"
        priority
      />
      <div className="w-[100%] h-100% relative flex-col justify-center items-center grid grid-cols-1">
        <Link href="/home" className="relative p-5 w-[100%] col-span-1 text-2xl text-white border-b border-t text-center border-purple-800 hover:bg-purple-800 transition-colors">
          Home
        </Link>
        <Link href="/leaderboard" className="relative p-5 col-span-1 text-2xl text-white border-b text-center border-purple-800 hover:bg-purple-800 transition-colors">
          Leaderboard
        </Link>
        <Link href="/myteams" className="relative p-5 col-span-1 text-2xl text-white border-b text-center border-purple-800 hover:bg-purple-800 transition-colors">
          My Teams
        </Link>
        <Link href="/players" className="relative p-5 col-span-1 text-2xl text-white border-b text-center border-purple-800 hover:bg-purple-800 transition-colors">
          Players
        </Link>
        <Link href="/tournaments" className="relative p-5 col-span-1 text-2xl text-white border-b text-center border-purple-800 hover:bg-purple-800 transition-colors">
          Tournaments
        </Link>
        <Link href="/profile" className="relative p-5 col-span-1 text-2xl text-white border-b text-center border-purple-800 hover:bg-purple-800 transition-colors">
          Profile
        </Link>
        {admin === 1 && (
          <Link href="/create-results" className="relative p-5 col-span-1 text-2xl text-white border-b text-center border-purple-800 hover:bg-purple-800 transition-colors">
            Input Scores
          </Link>
        )}
      </div>
    </div>
  )
}
