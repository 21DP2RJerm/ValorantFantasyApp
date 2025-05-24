"use client"
import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import Navigation from "../navigation"

export default function Tournaments() {
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
      <Navigation/>
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
                      <Link 
                        href={`/tournaments/${tournament.id}`}
                        key={tournament.id}
                        className="relative w-[90%] h-[150px] rounded-lg border-8 cursor-pointer border-white flex flex-row transition-transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-white"
                      >
                        {/* Background Image */}
                        <Image
                          src={`http://127.0.0.1:8000/storage/tournaments/${tournament.logo}`}
                          alt="Tournament background"
                          fill
                          sizes="(max-width: 1920px)"
                          style={{
                            objectFit: "cover",
                            zIndex: 0,
                          }}
                        />

                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gray-900/70 z-10" />


                        <div className="w-[100%] flex items-center justify-between px-6 relative z-20">
                        {tournament.type == "Masters" && (
                          <Image
                            src={"/masters.png"}
                            alt="Masters"
                            width={70}
                            height={70}
                            style={{
                              zIndex: 0,
                            }}
                          />
                        )}
                        {tournament.type == "Champions" && (
                          <Image
                            src={"/champions.webp"}
                            alt="champions"
                            width={70}
                            height={70}
                            style={{
                              zIndex: 0,
                            }}
                          />
                        )}
                        {tournament.type == "Regional"  && (
                          <Image
                            src={"/regional.png"}
                            alt="regional"
                            width={70}
                            height={70}
                            style={{
                              zIndex: 0,
                            }}
                          />
                        )}
                        {tournament.type == "Kickoff"  && (
                          <Image
                            src={"/regional.png"}
                            alt="regional"
                            width={70}
                            height={70}
                            style={{
                              zIndex: 0,
                            }}
                          />
                        )}
                          <p className="text-white text-2xl font-bold">{tournament.name}</p>
                          <p className="text-white text-2xl font-bold">{tournament.location}</p>
                        </div>
                      </Link>
                  ))
                ) : (
                  <div className="text-white text-xl">No tournaments to display.</div>
                )}

                {/* Add New Tournament Button */}
                <div className="relative w-[90%] h-[150px] bg-purple-900 rounded-lg border-8 border-white flex flex-row transition-transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-white">
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
