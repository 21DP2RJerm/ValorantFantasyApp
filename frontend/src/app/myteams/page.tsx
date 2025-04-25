"use client"
import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"

export default function MyTeams() {
  const [players, setPlayers] = useState([])
  const [search, setSearch] = useState("")
  const [regions, setRegions] = useState(["VCT EMEA", "VCT Americas", "VCT Pacific", "VCT China"])
  const [selectedRegion, setSelectedRegion] = useState("VCT EMEA")

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

  const filteredPlayers = players.filter((player) => player.in_game_name?.toLowerCase().includes(search.toLowerCase()))

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

      <div className="absolute right-0 flex flex-col items-center h-full w-[85%] space bg-purple-400 pt-20">
        {/* Team Display Box */}
        <a href="/myteams/fantasyTeamId" className="relative w-[90%] h-[150px] bg-purple-700 rounded-lg border-8 border-white flex flex-row mb-6">
          {/* Players Row */}
          <div className="flex items-center justify-start p-6 h-full w-[80%]">
            {[1, 2, 3, 4, 5].map((index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center border-4 border-white rounded-lg w-[120px] h-[110px] mx-2"
              >
                <Image src="/jamppi.png" alt="Player" width={100} height={100} style={{ objectFit: "contain" }} />
              </div>
            ))}
          </div>

          {/* Region Text */}
          <div className="w-[20%] flex items-center justify-center">
            <span className="text-white text-2xl font-bold">VCT EMEA</span>
          </div>
        </a>

        {/* Add New Team Box */}
        <div className="relative w-[90%] h-[150px] bg-purple-700 rounded-lg border-8 border-white flex flex-row">
          {/* Region Dropdown */}
          <div className="w-[30%] flex items-center justify-center border-r-4 border-white">
            <div className="w-[80%]">
              <select
                className="w-full bg-purple-600 text-white border-2 border-white p-2 rounded-md"
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
              >
                {regions.map((region) => (
                  <option key={region} value={region}>
                    {region}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Add Team Button */}
          <div className="w-[70%] flex flex-col items-center justify-center cursor-pointer">
            <div className="text-white text-5xl font-bold mb-2">+</div>
            <span className="text-white text-xl font-bold">Add New Team</span>
          </div>
        </div>
      </div>
    </div>
  )
}
