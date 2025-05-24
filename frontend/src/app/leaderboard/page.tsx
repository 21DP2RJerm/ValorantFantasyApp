"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Navigation from "../navigation"

export default function Leaderboard() {
  const [name, setName] = useState("")
  const [fantasyTeams, setFantasyTeams] = useState([])
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(true)
  const [loadingTeams, setLoadingTeams] = useState(false)
  const [tournaments, setTournaments] = useState([])
  const [selectedTournament, setSelectedTournament] = useState("")

  // Fetch tournaments when component mounts
  useEffect(() => {
    async function fetchTournaments() {
      try {
        const token = localStorage.getItem("userToken")
        const response = await fetch("http://127.0.0.1:8000/api/getLeaderboardTournaments", {
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
  }, []) // Empty dependency array means this runs once on mount

  // Fetch fantasy teams when tournament is selected
  useEffect(() => {
    async function fetchFantasyTeams() {
      if (!selectedTournament) {
        setFantasyTeams([])
        return
      }

      setLoadingTeams(true)
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/getFantasyTeams/${selectedTournament}`, {
          headers: {
            Accept: "application/json",
          },
        })

        if (!response.ok) {
          throw new Error("Failed to fetch fantasy teams")
        }

        const data = await response.json()
        setFantasyTeams(data.fantasyTeams)
        console.log(data)
      } catch (error) {
        console.error("Error fetching fantasy teams:", error)
        setError("Failed to load fantasy teams")
      } finally {
        setLoadingTeams(false)
      }
    }

    fetchFantasyTeams()
  }, [selectedTournament]) // This runs whenever selectedTournament changes

  // Handle tournament selection
  const handleTournamentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTournament(e.target.value)
    setError("") // Clear any previous errors
  }

  return (
    <div className="relative flex justify-center h-screen w-screen space bg-purple-900">
      <Navigation />

      <div className="absolute right-0 flex justify-center items-start h-full w-[85%] space bg-gray-900 pt-20">
        <select
          name="tournament"
          value={selectedTournament}
          onChange={handleTournamentChange}
          className="h-12 w-64 rounded-lg mr-7 text-zinc-950"
          disabled={loading}
        >
          <option value="">Select a tournament</option>
          {tournaments.map((tournament) => (
            <option key={tournament.id} value={tournament.id.toString()}>
              {tournament.name}
            </option>
          ))}
        </select>

        <div className="relative w-[70%] h-[80%] bg-purple-700 rounded-lg border-8 border-white flex flex-col overflow-y-auto">
          <div className="grid grid-cols-12 items-center w-full py-2 border-b-4 border-white last:border-b-0">
            <p className="col-span-1 text-lg text-white text-center">Nr</p>
            <p className="col-span-2 text-lg text-white text-center">User</p>
            <p className="col-span-7 text-lg text-white text-center">Players</p>
            <p className="col-span-2 text-lg text-white text-center">Points</p>
          </div>

          {loading ? (
            <div className="flex items-center justify-center h-full">
              <p className="text-white text-lg">Loading tournaments...</p>
            </div>
          ) : loadingTeams ? (
            <div className="flex items-center justify-center h-full">
              <p className="text-white text-lg">Loading fantasy teams...</p>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center h-full">
              <p className="text-red-200 text-lg">{error}</p>
            </div>
          ) : !selectedTournament ? (
            <div className="flex items-center justify-center h-full">
              <p className="text-white text-lg">Please select a tournament to view leaderboard</p>
            </div>
          ) : fantasyTeams.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <p className="text-white text-lg">No fantasy teams found for this tournament</p>
            </div>
          ) : (
            fantasyTeams.map((team, index) => (
              <div
                key={team.id}
                className="grid grid-cols-12 items-center w-full py-2 border-b border-white last:border-b-0"
              >
                <p className="col-span-1 text-lg text-white text-center">{index + 1}</p>
                <p className="col-span-2 text-lg text-white text-center">{team.user.name}</p>
                <p className="col-span-7 text-lg text-white text-center">
                  {team.fantasy_team_players.map((ftp) => ftp.player.in_game_name).join(", ")}
                </p>
                <p className="col-span-2 text-lg text-white text-center">{team.points}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
