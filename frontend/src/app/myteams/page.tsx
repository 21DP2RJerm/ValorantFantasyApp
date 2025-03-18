"use client"
import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"

export default function MyTeams() {
  const [players, setPlayers] = useState([]);
  const [search, setSearch] = useState("")

  useEffect(() => {
      async function fetchPlayers() {
        try {
          const response = await fetch("http://127.0.0.1:8000/api/players")
          const data = await response.json()
          setPlayers(data)
        } catch (error) {
          console.error("Error fetching players:", error)
        }
      }
  
      fetchPlayers()
    }, [])

    const filteredPlayers = players.filter((player) => player.in_game_name.toLowerCase().includes(search.toLowerCase()))
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
        <div className="relative w-[90%] h-[90%] bg-purple-700 rounded-lg border-8 border-white flex flex-col">
          <div className="flex items-center justify-center p-6 h-[40%]">
            {[1, 2, 3, 4, 5].map((index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center border-4 border-white rounded-lg w-[16%] h-full mx-3"
              >
                <Image
                  src="/jamppi.png"
                  alt="Logo"
                  width={130}
                  height={130}
                  style={{ objectFit: "contain" }}
                  className="rounded-full border-4 border-white mb-2"
                />
                <p className="text-2xl text-white text-center">Jamppi</p>
                <p className="text-2xl text-white text-center">Initiator</p>
              </div>
            ))}
          </div>
          <div className="flex-grow border-t-4 border-white rounded-b-lg overflow-y-auto pt-8">
            <div className="flex items-center justify-start ml-10 mb-4 space-x-4">
              <input
                type="text"
                name="name"
                placeholder="Search for player"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-12 w-64 rounded-lg p-4 text-zinc-950"
                required
              />
              <div className="flex items-center space-x-4 text-white">
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="form-checkbox h-5 w-5 text-purple-600" />
                  <span>Initiator</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="form-checkbox h-5 w-5 text-purple-600" />
                  <span>Sentinel</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="form-checkbox h-5 w-5 text-purple-600" />
                  <span>Duelist</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="form-checkbox h-5 w-5 text-purple-600" />
                  <span>Controller</span>
                </label>
              </div>
            </div>
            <div className="flex flex-wrap justify-center p-6 gap-4">
              {filteredPlayers.length > 0 ? (
                filteredPlayers.map((player, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center justify-center border-4 border-white rounded-lg w-[13%] aspect-square transition-transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-white"
                  >
                    <Image
                      src={player.logo || "/placeholder.svg"}
                      alt={player.logo}
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
                <p className="text-white text-lg">No players found</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
