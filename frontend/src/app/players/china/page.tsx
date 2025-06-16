"use client"
import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import Navigation from "@/app/navigation"

export default function EMEA() {
  const [teams, setTeams] = useState([])
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [region, setRegion] = useState('China') 
  useEffect(() => {
    checkAdminAccess()
  }, [])

  const checkAdminAccess = async () => {
    try {
      const token = localStorage.getItem("userToken")

      if (!token) {
        router.push("/login")
        return
      }
      console.log(token)
      const response = await fetch("http://127.0.0.1:8000/api/verifyAdmin", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      })

      if (response.ok) {
        const data = await response.json()
        if (data.is_admin) {
          setIsAdmin(true)
        } else {
          setIsAdmin(false)
        }
      } 
    } catch (error) {
      console.error("Error checking admin access:", error)
      router.push("/")
    } finally {
      setIsLoading(false)
    }
  }
  useEffect(() => {
    async function fetchTeams() {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/teams/${region}`)
        const data = await response.json()
        setTeams(data)
        console.log(data)
      } catch (error) {
        console.error("Error fetching teams:", error)
      }
    }

    if (region) {
      fetchTeams()
    }
  }, [region])


  return (
    <div className="relative flex justify-center h-screen w-screen space bg-purple-900">
       <Navigation/>
      <div className="absolute right-0 flex justify-between items-start h-full w-[85%] space-x-4 bg-gray-900 pt-20 px-4">
        <div className="w-[85%] bg-purple-700 rounded-lg border-8 border-white flex flex-col overflow-y-auto">
          <h2 className="text-2xl text-white font-bold text-center py-4">Teams</h2>
          { isAdmin &&(
            <div className="flex space-x-4 px-6 items-center justify-center">
              <Link href="/create-team" className="bg-white py-2 rounded-md hover:bg-slate-300 transition-colors text-purple-500 mt-1 px-4">
                Create team
              </Link>
              <Link href="/create-player" className="bg-white py-2 rounded-md hover:bg-slate-300 transition-colors text-purple-500 mt-1 px-4">
                Create player
              </Link>
            </div>
          )}
          <div className="flex flex-wrap justify-center p-6 gap-4">
            {teams.length > 0 ? (
              teams.map((team, index) => (
                <Link
                  href={`/players/${team.id}`}
                  key={index}
                  className="flex flex-col items-center justify-center border-4 border-white rounded-lg w-[15%] bg-purple-800 aspect-square transition-transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-white"
                >
                  <Image
                    src={team.logo}
                    alt={team.name}
                    width={140}
                    height={140}
                    style={{ objectFit: "contain" }}
                    className=" mb-2 mt-4"
                  />
                  <p className="text-lg text-white text-center">{team.name}</p>
                </Link>
              ))
            ) : (
              <p className="text-white text-lg">Loading teams...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
