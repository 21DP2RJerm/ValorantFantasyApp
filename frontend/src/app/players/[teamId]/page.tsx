"use client"

import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function Team() {
  const { teamId } = useParams() 
  const [team, setTeam] = useState([])
  const [players, setPlayers] = useState([])
    useEffect(() => {
      async function fetchTeamData() {
        try {
          const response = await fetch(`http://127.0.0.1:8000/api/getTeamInfo/${teamId}`)
          if (!response.ok) throw new Error("Failed to fetch team data")
  
          const data = await response.json()
          setTeam(data.team)
          setPlayers(data.players)
          console.log("Team Data:", data)
        } catch (error) {
          console.error("Error fetching team details:", error)
        }
      }
  
      fetchTeamData()
    }, [teamId])

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
          <Link href="/leaderboard" className="relative p-2 col-span-1 text-2xl  text-white">
            Leaderboard
          </Link>
          <Link href="/myteams" className="relative p-2 col-span-1 text-2xl  text-white">
            My Teams
          </Link>
          <Link href="/players" className="relative p-2 col-span-1 text-2xl  text-white">
            Players
          </Link>
          <Link href="/profile" className="relative p-2 col-span-1 text-2xl text-white">
            Profile
          </Link>
        </div>
      </div>

      <div className="absolute right-0 flex justify-center items-start h-full w-[85%] bg-purple-400 pt-20">
        <div className="relative w-[70%] h-[60%] bg-purple-700 rounded-lg border-8 border-white flex flex-col">
          {/* Team Info */}
          <div className="flex items-center p-6">
            <div className="flex-shrink-0">
              <Image
                src={`/${team.logo}`}  // Dynamically load team logo
                alt={team.name}
                width={200}
                height={200}
                style={{ objectFit: "contain" }}
              />
            </div>
            <div className="flex-grow ml-8">
              <div className="text-4xl text-white mb-2">{team.name}</div>
              <div className="text-2xl text-white">{team.region}</div>
            </div>
          </div>

          {/* Players List */}
          <div className="flex-grow border-t-4 border-white rounded-b-lg">
            <div className="flex items-center justify-center p-6 h-full gap-4">
              {players.length > 0 ? (
                players.map((player, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center justify-center border-4 border-white rounded-lg w-[13%] aspect-square transition-transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-white"
                  >
                    <Image
                      src={`http://127.0.0.1:8000/storage/players/${player.logo}`}
                      alt={player.in_game_name || "Player image"}
                      width={80}
                      height={80}
                      style={{ objectFit: "contain" }}
                      className="rounded-full border-4 border-white mb-2 mt-4"
                    />
                    <p className="text-lg text-white text-center">{player.in_game_name}</p>
                    <p className="text-lg text-white text-center mb-2">Initiator</p>
                  </div>
                ))
              ) : (
                <p className="text-white text-lg">Loading teams...</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

