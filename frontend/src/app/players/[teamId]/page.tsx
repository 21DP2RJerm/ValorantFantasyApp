"use client"

import Navigation from "@/app/navigation"
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
      <Navigation/>

      <div className="absolute right-0 flex justify-center items-start h-full w-[85%] bg-purple-400 pt-20">
        <div className="relative w-[70%] h-[60%] bg-purple-700 rounded-lg border-8 border-white flex flex-col">
          {/* Team Info */}
          <div className="flex items-center p-6">
            <div className="flex-shrink-0">
              <Image
                src={`http://127.0.0.1:8000/storage/teams/${team.logo}`}  // Dynamically load team logo
                alt={team.name || "Team"}
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
                    className="flex flex-col items-center justify-center border-4 border-white rounded-lg w-[16%] aspect-square transition-transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-white"
                  >
                    <Image
                      src={`http://127.0.0.1:8000/storage/players/${player.logo}`}
                      alt={player.in_game_name || "Player image"}
                      width={160}
                      height={160}
                      style={{ objectFit: "contain" }}
                      className="rounded-full border-4 border-white mb-2 mt-4"
                    />
                    <p className="text-lg text-white text-center">{player.in_game_name}</p>
                    <p className="text-lg text-white text-center mb-2">Initiator</p>
                  </div>
                ))
              ) : (
                <p className="text-white text-lg">Loading players...</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

