"use client"
import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"

export default function EMEA() {
  const [teams, setTeams] = useState([])

  useEffect(() => {
    async function fetchTeams() {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/teams")
        const data = await response.json()
        setTeams(data)
      } catch (error) {
        console.error("Error fetching teams:", error)
      }
    }

    fetchTeams()
  }, [])

  async function handleClick(teamId) {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/getTeamInfo/${teamId}`)
      const data = await response.json()
      console.log("Team Data:", data) // Log the response in the console
    } catch (error) {
      console.error("Error fetching team details:", error)
    }
  }

  return (
    <div className="relative flex justify-center h-screen w-screen space bg-purple-900">
      {/* Sidebar */}
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

      {/* Main Content */}
      <div className="absolute right-0 flex justify-between items-start h-full w-[85%] space-x-4 bg-purple-400 pt-20 px-4">
        <div className="w-[85%] bg-purple-700 rounded-lg border-8 border-white flex flex-col overflow-y-auto">
          <h2 className="text-2xl text-white font-bold text-center py-4">Teams</h2>
          <div className="flex space-x-4 px-6 items-center justify-center">
            <Link href="/create-team" className="bg-white py-2 rounded-md hover:bg-slate-300 transition-colors text-purple-500 mt-1 px-4">
              Create team
            </Link>
            <Link href="/create-player" className="bg-white py-2 rounded-md hover:bg-slate-300 transition-colors text-purple-500 mt-1 px-4">
              Create player
            </Link>
          </div>
          <div className="flex flex-wrap justify-center p-6 gap-4">
            {teams.length > 0 ? (
              teams.map((team, index) => (
                <Link
                  href={`/players/${index+1}`}
                  onClick={() => handleClick((index+1))}
                  key={index}
                  className="flex flex-col items-center justify-center border-4 border-white rounded-lg w-[20%] aspect-square transition-transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-white"
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
