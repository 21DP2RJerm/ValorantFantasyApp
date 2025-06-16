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
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null)
  const [isLoading, setIsLoading] = useState(true)

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
    async function fetchPlayerData() {
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

    fetchPlayerData()
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
              <div className="text-4xl text-white mb-2">{playerInfo.name + " " + playerInfo.last_name}</div>
              <div className="text-2xl text-white mb-2">{playerInfo.team_name}</div>
              { isAdmin && (
                <Link href={`/edit-player/${playerInfo.id}`} className="bg-white py-2 rounded-md hover:bg-slate-300 transition-colors text-purple-500 px-4 ">
                  Edit player
                </Link>
              )}
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
