"use client"

import Navigation from "@/app/navigation"
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function Tournament() {
  const { tournamentId } = useParams()
  const [tournament, setTournament] = useState([])
  const [teams, setTeams] = useState([])
  const [games, setGames] = useState([])

  useEffect(() => {
    async function fetchTournamentData() {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/getTournamentInfo/${tournamentId}`)
        if (!response.ok) throw new Error("Failed to fetch tournament data")

        const data = await response.json()
        setTournament(data.tournament)
        setTeams(data.teams)
        setGames(data.games)
        console.log("tournament Data:", data)
      } catch (error) {
        console.error("Error fetching tournament details:", error)
      }
    }

    fetchTournamentData()
  }, [tournamentId])

  return (
    <div className="relative flex justify-center h-screen w-screen space bg-purple-900">
      <Navigation />

      <div className="absolute right-0 flex justify-center items-start h-full w-[85%] bg-gray-900 pt-20">
        <div className="relative w-[70%] h-[60%] bg-purple-700 rounded-lg border-8 border-white flex flex-col">
          <div className="relative flex items-center p-6 h-[30%] overflow-hidden rounded-t-lg">
              <div className="absolute inset-0">
                <Image
                  src={`http://127.0.0.1:8000/storage/tournaments/${tournament.logo}`}
                  alt={tournament.name || "tournament"}
                  fill
                  style={{ objectFit: "cover" }}
                />
                <div className="absolute inset-0 bg-black bg-opacity-50"></div>
              </div>
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
            <div className="relative flex w-full justify-between">
              <div className="relative ">
                <div className="text-4xl text-white mb-2 font-bold">{tournament.name}</div>
                <div className="text-2xl text-white">{tournament.location}</div>
              </div>
              <div className="relative ">
                <div className="text-2xl text-white mb-2">{tournament.start_date}</div>
                <div className="text-2xl text-white">{tournament.end_date}</div>
              </div>
            </div>

          </div>

          <div className="flex-grow border-t-4 border-white rounded-b-lg p-6 overflow-y-auto">
            <div className="grid grid-cols-8 gap-4">
              {teams.length > 0 ? (
                teams.map((team, index) => (
                    <Link
                        href={`/players/${team.id}`}
                        key={index}
                        className="flex flex-col items-center justify-center border-4 border-white rounded-lg aspect-square bg-purple-800 p-2 transition-transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-white"
                    >
                    <div className="relative w-full h-3/4 flex items-center justify-center">
                      <Image
                        src={`http://127.0.0.1:8000/storage/teams/${team.logo}`}
                        alt={team.name || "Team logo"}
                        width={80}
                        height={80}
                        style={{ objectFit: "contain" }}
                        className="p-1"
                      />
                    </div>
                    <p className="text-lg text-white text-center mt-2 truncate w-full">{team.name}</p>
                  </Link>
                ))
              ) : (
                <p className="text-white text-lg col-span-full text-center">Loading teams...</p>
              )}
            </div>
          </div>
        </div>
        <div className="relative w-[20%] h-[60%] bg-purple-700 rounded-lg border-8 ml-10 border-white flex flex-col">
          {games.length> 0 ?(
            games.map((game, index) => (
              <div className="relative w-full h-1/3 border-2 items-center border-white flex flex-row justify-between"
                key={game.id}>
                <div className="relative flex flex-col justify-between">
                    <Image
                      src={`http://127.0.0.1:8000/storage/teams/${game.results[0].team_logo}`}
                      alt={'team1'}
                      width={80}
                      height={80}
                      style={{ objectFit: "contain" }}
                      className="ml-5"
                    />
                </div>
                <div className="relative flex flex-col items-center justify-between">
                  <p className="text-lg text-white text-center w-full font-bold">{game.results[0].score + " : " + game.results[1].score}</p>
                  <p className="text-lg text-white text-center w-full">{game.game_name}</p>
                </div>
                <div className="relative flex flex-col justify-between">
                    <Image
                      src={`http://127.0.0.1:8000/storage/teams/${game.results[1].team_logo}`}
                      alt={'team2'}
                      width={80}
                      height={80}
                      style={{ objectFit: "contain" }}
                      className="mr-5"
                    />
                </div>
              </div>
            ))
          ): (
            <p className="text-white text-lg col-span-full text-center">Loading games...</p>
          )}
        </div>
      </div>
    </div>
  )
}
