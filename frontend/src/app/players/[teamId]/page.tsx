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
    } 
  }
    useEffect(() => {
      async function fetchTeamData() {
        setIsLoading(true)
        try {
          const response = await fetch(`http://127.0.0.1:8000/api/getTeamInfo/${teamId}`)
          if (!response.ok) throw new Error("Failed to fetch team data")
  
          const data = await response.json()
          setTeam(data.team)
          setPlayers(data.players)
          setGames(data.games)
          setIsLoading(false)
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

      <div className="absolute right-0 flex justify-center items-start h-full w-[85%] bg-gray-900 pt-20">
        <div className="relative w-[70%] h-[80%] bg-purple-700 rounded-lg border-8 border-white flex flex-col">
          <div className="flex items-center p-6">
            <div className="flex-shrink-0">
              <Image
                src={`http://127.0.0.1:8000/storage/teams/${team.logo}`} 
                alt={team.name || "Team"}
                width={200}
                height={200}
                style={{ objectFit: "contain" }}
              />
            </div>
            <div className="flex-grow ml-8">
              <div className="text-4xl text-white mb-2">{team.name}</div>
              <div className="text-2xl text-white mb-2">{team.region}</div>
              { isAdmin && (
                <div>
                  <Link href={`/edit-team/${team.id}`} className="bg-white py-2 rounded-md hover:bg-slate-300 transition-colors text-purple-500 px-4 mr-2">
                    Edit team
                  </Link>
                  <Link href={`/create-player/`} className="bg-white py-2 rounded-md hover:bg-slate-300 transition-colors text-purple-500 px-4 ">
                    Create Player
                  </Link>
                </div>
                
                
              )}
            </div>
          </div>

          <div className="flex-grow border-t-4 border-white rounded-b-lg">
            <div className="flex items-center justify-center p-6 h-full gap-4">
              {isLoading ? (
                <p className="text-white text-lg">Loading players...</p>
              ) : players.length > 0 ? (
                players.map((player, index) => (
                  <Link
                    href={`/player/${player.id}`}
                    key={index}
                    className="flex flex-col items-center justify-center border-4 bg-purple-800 border-white rounded-lg w-[16%] aspect-square transition-transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-white"
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
                  </Link>
                ))
              ) : (
                <p className="text-white text-lg">No players on this team.</p>
              )}
            </div>
          </div>
        </div>
        <div className="relative w-[20%] h-[60%] bg-purple-700 rounded-lg border-8 ml-10 border-white flex flex-col">
          {isLoading ? (
                <p className="text-white text-lg text-center">Loading games...</p>
              ) : games.length> 0 ?(
            games.map((game, index) => (
                <div key={game.id} className="relative w-full h-1/3 border-2 border-white flex flex-row items-center justify-between p-2">
                  <div className="flex items-center justify-center">
                    <Image
                      src={`http://127.0.0.1:8000/storage/teams/${game.results[0].team_logo}`}
                      alt={'team1'}
                      width={80}
                      height={80}
                      style={{ objectFit: "contain" }}
                      className="max-w-full max-h-full"
                    />
                  </div>
                  <div className="flex flex-col items-center justify-center flex-1 px-4">
                    <p className="text-lg text-white text-center font-bold">{game.results[0].score + " : " + game.results[1].score}</p>
                    <p className="text-sm text-white text-center">{game.tournament + " " + game.game_name}</p>
                  </div>
                  <div className="flex items-center justify-center">
                    <Image
                      src={`http://127.0.0.1:8000/storage/teams/${game.results[1].team_logo}`}
                      alt={'team2'}
                      width={80}
                      height={80}
                      style={{ objectFit: "contain" }}
                      className="max-w-full max-h-full"
                    />
                  </div>
                </div>
            ))
          ): (
            <p className="text-white text-lg col-span-full text-center">No games played</p>
          )}
        </div>
      </div>
    </div>
  )
}

