"use client"

import Navigation from "@/app/navigation"
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function PlayerProfile() {
  const {playerId} = useParams()
  const [playerInfo, setPlayerInfo] = useState([])
  const [games, setGames] = useState([])
  useEffect(() => {
    async function fetchTeamData() {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/getPlayersResults/${playerId}`)
        if (!response.ok) throw new Error("Failed to fetch player data")

        const data = await response.json()
        setPlayerInfo(data.player)
        setGames(data.games)
        console.log("Player Data:",data.games)
      } catch (error) {
        console.error("Error fetching Player details:", error)
      }
    }

    fetchTeamData()
  }, [playerId])

  return (
    <div className="relative flex justify-center h-screen w-screen space bg-purple-900">
       <Navigation/>

      <div className="absolute right-0 flex flex-col items-start h-full w-[85%] space-y-6 bg-gray-900 pt-10 px-6 overflow-y-auto  pb-5">
        <div className="w-full bg-purple-900 rounded-lg border-8 border-white flex flex-col">
          <div className="flex items-center p-6">
            <div className="flex-shrink-0">
              <Image
                src={`http://127.0.0.1:8000/storage/players/${playerInfo.logo}`}
                alt={`${playerInfo.in_game_name}'s profile picture`}
                width={200}
                height={200}
                style={{ objectFit: "contain" }}
                className="rounded-full border-4 border-white"
              />
            </div>
            <div className="flex-grow ml-8">
              <div className="text-4xl text-white mb-2">{playerInfo.in_game_name}</div>
              <div className="text-2xl text-white">{playerInfo.team_name}</div>
            </div>
          </div>
        </div>
        <div className="w-full bg-purple-900 rounded-lg border-8 border-white flex flex-col overflow-y-auto">
          <div className="grid grid-cols-12 items-center w-full py-2 border-b-4 border-white last:border-b-0">
            <p className="col-span-2 text-lg text-white text-center">Tournament</p>
            <p className="col-span-2 text-lg text-white text-center">vs</p>
            <p className="col-span-2 text-lg text-white text-center">Kills</p>
            <p className="col-span-2 text-lg text-white text-center">Deaths</p>
            <p className="col-span-2 text-lg text-white text-center">Assists</p>
            <p className="col-span-2 text-lg text-white text-center">Points</p>
          </div>
          {games.map((game, index) => (
            <div
              key={index}
              className="grid grid-cols-12 items-center w-full py-2 border-b border-white last:border-b-0"
            >
              <p className="col-span-2 text-lg text-white text-center">{game.tournament}</p>
              <p className="col-span-2 text-lg text-white text-center">{game.opposingTeam}</p>
              <p className="col-span-2 text-lg text-white text-center">{game.results.kills}</p>
              <p className="col-span-2 text-lg text-white text-center">{game.results.deaths}</p>
              <p className="col-span-2 text-lg text-white text-center">{game.results.assists}</p>
              <p className="col-span-2 text-lg text-white text-center">{game.results.points}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
