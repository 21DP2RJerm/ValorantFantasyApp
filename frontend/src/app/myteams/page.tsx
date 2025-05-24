"use client"
import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import Navigation from "../navigation"


export default function MyTeams() {
  const [teams, setTeams] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    async function fetchTeams() {
      try {
        const token = localStorage.getItem("userToken")
        const response = await fetch("http://127.0.0.1:8000/api/getUserFantasyTeams", {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        })

        if (!response.ok) {
          throw new Error("Failed to fetch teams")
        }

        const data = await response.json()
        console.log(data)
        setTeams(Array.isArray(data) ? data : [])
      } catch (error) {
        console.error("Error fetching teams:", error)
        setError("Failed to load your teams")
      } finally {
        setLoading(false)
      }
    }

    fetchTeams()
  }, [])

  return (
    <div className="relative flex justify-center h-screen w-screen space bg-purple-900 ">
      <Navigation/> 

      <div className="absolute right-0 flex flex-col items-center h-full w-[85%] space bg-gray-800 pt-20">
        <div className="w-[90%] mb-4">
          <h2 className="text-white text-2xl font-bold">My Teams ({teams.length || 0})</h2>
        </div>

        {loading ? (
          <div className="text-white text-xl">Loading your teams...</div>
        ) : error ? (
          <div className="text-red-200 text-xl">{error}</div>
        ) : (
          <>
            {teams.length > 0 ? (
              teams.map((team) => (
                <Link
                  href={`/myteams/${team.fantasy_team_id}`}
                  key={team.fantasy_team_id}
                  className="relative w-[90%] h-[150px] bg-purple-900 rounded-lg border-8 border-white flex flex-row mb-6"
                >
                  {/* Players Row */}
                  <div className="flex items-center justify-start p-6 h-full w-[80%]">
                    {team.players &&
                      team.players.map((player, index) => (
                        <div
                          key={index}
                          className="flex flex-col items-center justify-center border-4 border-white rounded-lg w-[105px] h-[105px] mx-2"
                        >
                          <Image
                            src={player.logo || "/placeholder.svg"}
                            alt={player.in_game_name}
                            width={100}
                            height={100}
                            style={{ objectFit: "contain" }}
                          />
                        </div>
                      ))}
                  </div>

                  {/* Tournament Info */}
                  <div className="w-[35%] flex items-center justify-center">
                    <p className="text-white text-2xl font-bold pr-10">Points: {team.points || 0}</p>
                    <p className="text-white text-2xl font-bold">
                      {team.tournament_name || `Tournament ${team.tournament_id}`}
                    </p>
                  </div>
                </Link>
              ))
            ) : (
              <div className="text-white text-xl mb-6">You haven't created any teams yet.</div>
            )}

            {/* Add New Team Button */}
            <div className="relative w-[90%] h-[150px] bg-purple-900 rounded-lg border-8 border-white flex flex-row">
              <Link href="/myteams/createFantasyTeam" className="w-full flex flex-col items-center justify-center">
                <div className="w-full flex flex-col items-center justify-center cursor-pointer">
                  <div className="text-white text-5xl font-bold mb-2">+</div>
                  <span className="text-white text-xl font-bold">Add New Team</span>
                </div>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
