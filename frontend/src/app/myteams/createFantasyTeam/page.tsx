"use client"
import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import api from 'axios';
import Navigation from "@/app/navigation";

export default function FantasyTeamId() {
  const [players, setPlayers] = useState([])
  const [search, setSearch] = useState("")
  const roles = ["Duelist", "Controller", "Initiator", "Sentinel", "Flex"]
  const roleMeanings = [
    "Deaths are equal to -1 point not -2",
    "Assists give +2 points instead of +1",
    "Assists give +2 points instead of +1",
    "Each round survived gives +1 point",
    "No point changes",
  ]
  const [teamPlayers, setTeamPlayers] = useState(Array(5).fill(null))
  const [tournaments, setTournaments] = useState([])
  const [selectedTournament, setSelectedTournament] = useState("")

  async function createFantasyTeam(){
    try {
      console.log(teamPlayers);
      const playerIds = teamPlayers.map(player => player?.player_id);
      const token = localStorage.getItem('userToken');
      const response = await api.post(
        "http://127.0.0.1:8000/api/createFantasyTeam",
        {
          tournament_id: selectedTournament,
          players: playerIds,
        },
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        },)
        const text = await response; 
        console.log("Raw Response:", text); 
    
        alert(text.data);
    }catch(error){
      console.error("Team creation failed:", error)
    }
  }

  async function fetchPlayers(tournamentId = null) {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/players?tournament_id=${tournamentId}`)
      const data = await response.json()
      setPlayers(data)
      console.log(data)
    } catch (error) {
      console.error("Error fetching players:", error)
    }
  }

  useEffect(() => {
    async function fetchTournaments() {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/getUnstartedTournaments")
        const data = await response.json()
        setTournaments(data)
      } catch (error) {
        console.error("Error fetching tournaments:", error)
      }
    }

    fetchTournaments()
    fetchPlayers() // Initial fetch with no tournament filter
  }, [])

  // Filter players based on search term only
  const filteredPlayers = players.filter((player) => player.in_game_name.toLowerCase().includes(search.toLowerCase()))

  // Check if player is already on the team and return their index
  const getPlayerTeamIndex = (player) => {
    return teamPlayers.findIndex((teamPlayer) => teamPlayer && teamPlayer.in_game_name === player.in_game_name)
  }

  // Check if player is on team
  const isPlayerOnTeam = (player) => {
    return getPlayerTeamIndex(player) !== -1
  }

  // Handle player click - add to team if not on team, remove if already on team
  const handlePlayerClick = (player) => {
    const playerIndex = getPlayerTeamIndex(player)

    // If player is already on team, remove them
    if (playerIndex !== -1) {
      const newTeamPlayers = [...teamPlayers]
      newTeamPlayers[playerIndex] = null
      setTeamPlayers(newTeamPlayers)
      return
    }

    // Otherwise, add to first empty slot
    const firstEmptyIndex = teamPlayers.findIndex((p) => p === null)
    if (firstEmptyIndex !== -1) {
      const newTeamPlayers = [...teamPlayers]
      newTeamPlayers[firstEmptyIndex] = player
      setTeamPlayers(newTeamPlayers)
    }
  }

  const handleTournamentChange = (e) => {
    const tournamentId = e.target.value
    setSelectedTournament(tournamentId)
    fetchPlayers(tournamentId === "" ? null : tournamentId)
    setTeamPlayers(Array(5).fill(null))
  }

  return (
    <div className="relative flex justify-center h-screen w-screen space bg-purple-900 ">
      <Navigation/>

      <div className="absolute right-0 flex justify-center items-start h-full w-[85%] space bg-gray-800 pt-20">
        <div className="relative w-[90%] h-[90%] bg-purple-700 rounded-lg border-8 border-gray-300 flex flex-col">
          <div className="flex items-center justify-center p-6 h-[40%]">
            {[0, 1, 2, 3, 4].map((index) => (
              <div key={index} className="flex flex-col items-center justify-center rounded-lg w-[15%] h-full mx-3">
                <div className="flex flex-col items-center justify-center border-4 shadow-2xl border-gray-300 rounded-lg w-full h-full relative">
                  <div className="absolute inset-0 flex items-center justify-center z-0">
                    {teamPlayers[index] ? (
                      <>
                        <Image
                          src={teamPlayers[index].team_logo || "/placeholder.svg"}
                          alt="Team Logo"
                          fill
                          sizes="100%"
                          style={{
                            objectFit: "cover",
                            objectPosition: "center",
                          }}
                          className="opacity-30"
                        />
                      </>
                    ) : (
                      <>
                        <Image
                          src="/teamPlaceholder.png"
                          alt="Team Logo"
                          fill
                          sizes="80%"
                          style={{
                            objectFit: "cover",
                            objectPosition: "center",
                          }}
                          className="opacity-30 p-2"
                        />
                      </>
                    )}
                  </div>
                  <div className="relative z-10 flex flex-col items-center justify-center">
                    {teamPlayers[index] ? (
                      <>
                        <Image
                          src={teamPlayers[index].logo || "/user.png"}
                          alt="Player"
                          width={160}
                          height={160}
                          style={{ objectFit: "contain" }}
                          className="rounded-full mb-2"
                        />
                        <p className="text-2xl text-white text-center pt-2">{teamPlayers[index].in_game_name}</p>
                      </>
                    ) : (
                      <>
                        <Image
                          src="/user.png"
                          alt="Player"
                          width={160}
                          height={160}
                          style={{ objectFit: "contain" }}
                          className="rounded-full mb-2 opacity-80"
                        />
                      </>
                    )}
                  </div>
                </div>
                <span title={roleMeanings[index]} className="text-2xl text-white text-center pt-2 cursor-pointer">
                  {roles[index]}
                </span>
              </div>
            ))}
          </div>
          <div className="flex-grow border-t-4 border-white-gray-300 rounded-b-lg overflow-y-auto pt-8 ">
            <div className="flex items-center justify-start ml-10 mb-4 space-x-4">
              <input
                type="text"
                name="name"
                placeholder="Search for player"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-12 w-64 rounded-lg p-4 text-zinc-950  shadow-2xl"
                required
              />
              <select
                value={selectedTournament}
                onChange={handleTournamentChange}
                className="h-12 w-64 rounded-lg p-2 text-zinc-950  shadow-2xl"
              >
                <option value="">All Tournaments</option>
                {Array.isArray(tournaments) &&
                  tournaments.map((tournament) => (
                    <option key={tournament.id} value={tournament.id}>
                      {tournament.name}
                    </option>
                  ))}
              </select>
              <button 
                onClick={createFantasyTeam}
                className=" bg-white h-12 w-40 px-6 py-2  shadow-2xl rounded-md font-semibold hover:bg-slate-300 transition-colors text-purple-500">
                Create Team
              </button>
            </div>
            <div className="flex flex-wrap justify-center p-6 gap-4">
              {filteredPlayers.length > 0 ? (
                filteredPlayers.map((player, index) => (
                  <div
                    key={index}
                    className={`flex flex-col items-center justify-center border-4 shadow-2xl ${
                      isPlayerOnTeam(player) ? "border-green-400" : "border-gray-300"
                    } rounded-lg cursor-pointer w-[10%] aspect-square transition-transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-white`}
                    onClick={() => handlePlayerClick(player)}
                  >
                    <Image
                      src={player.logo || "/placeholder.svg"}
                      alt={player.logo || "Player logo"}
                      width={100}
                      height={100}
                      style={{ objectFit: "contain" }}
                      className="rounded-full border-4 border-white"
                    />
                    <p className="text-lg text-white text-center">{player.in_game_name}</p>
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
