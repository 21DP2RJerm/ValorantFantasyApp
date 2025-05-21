"use client"
import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"

export default function Tournament() {
  const [tournaments, setTournaments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    async function fetchTournaments() {
      try {
        const token = localStorage.getItem("userToken")
        const response = await fetch("http://127.0.0.1:8000/api/getTournaments", {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        })

        if (!response.ok) {
          throw new Error("Failed to fetch Tournaments")
        }

        const data = await response.json()
        console.log(data)
        setTournaments(data)
      } catch (error) {
        console.error("Error fetching tournaments:", error)
        setError("Failed to load your tournaments")
      } finally {
        setLoading(false)
      }
    }

    fetchTournaments()
  }, [])

  return (
    <div className="relative flex justify-center h-screen w-screen space bg-purple-900 overflow-hidden">
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
          <Link href="/tournaments" className="relative p-2 col-span-1 text-2xl text-white">
            Tournaments
          </Link>
          <Link href="/profile" className="relative p-2 col-span-1 text-2xl text-white">
            Profile
          </Link>
        </div>
      </div>

      <div className="absolute right-0 flex flex-col items-center h-full w-[85%] bg-gray-800">

        {/* Scrollable container for tournaments */}
        <div className="w-full flex-1 overflow-y-auto px-4 pb-6 py-10">
          <div className="flex flex-col items-center space-y-6 min-h-min">
            {loading ? (
              <div className="text-white text-xl">Loading tournaments...</div>
            ) : error ? (
              <div className="text-red-200 text-xl">{error}</div>
            ) : (
              <>
                {tournaments.length > 0 ? (
                  tournaments.map((tournament) => (
                    <div
                      key={tournament.id}
                      className="relative w-[90%] h-[150px] rounded-lg border-8 border-white flex flex-row"
                    >
                      {/* Background Image */}
                      <Image
                        src={"/torontoguide.jpg"}
                        alt="Tournament background"
                        fill
                        sizes="(max-width: 1920px) 90vw, 800px"
                        style={{
                          objectFit: "cover",
                          zIndex: 0,
                        }}
                      />

                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gray-900/70 z-10" />

                      {/* Tournament Info */}
                      <div className="w-[100%] flex items-center justify-between px-6 relative z-20">
                        <p className="text-white text-2xl font-bold">{tournament.name}</p>
                        <p className="text-white text-2xl font-bold">{tournament.location}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-white text-xl">No tournaments to display.</div>
                )}

                {/* Add New Tournament Button */}
                <div className="relative w-[90%] h-[150px] bg-purple-900 rounded-lg border-8 border-white flex flex-row">
                  <Link href="/create-tournament" className="w-full flex flex-col items-center justify-center">
                    <div className="w-full flex flex-col items-center justify-center cursor-pointer">
                      <div className="text-white text-5xl font-bold mb-2">+</div>
                      <span className="text-white text-xl font-bold">Add New Tournament</span>
                    </div>
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
