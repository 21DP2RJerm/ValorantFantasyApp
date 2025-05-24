"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Navigation from "../navigation"
import api from "axios"

export default function MatchResults() {

  const [currentStep, setCurrentStep] = useState(1)

  // Data states
  const [tournaments, setTournaments] = useState([])
  const [teams, setTeams] = useState([])
  const [selectedTournament, setSelectedTournament] = useState("")
  const [selectedTeam1, setSelectedTeam1] = useState("")
  const [selectedTeam2, setSelectedTeam2] = useState("")
  const [team1Players, setTeam1Players] = useState([])
  const [team2Players, setTeam2Players] = useState([])
  const [team1Stats, setTeam1Stats] = useState([])
  const [team2Stats, setTeam2Stats] = useState([])
  const [team1Score, setTeam1Score] = useState("")
  const [team2Score, setTeam2Score] = useState("")
  const [gameName, setGameName] = useState("")
  // Loading states
  const [loading, setLoading] = useState(false)
  const [loadingTournaments, setLoadingTournaments] = useState(false)
  const [loadingTeams, setLoadingTeams] = useState(false)
  const [loadingPlayers, setLoadingPlayers] = useState(false)

  // Fetch tournaments on component mount
  useEffect(() => {
    async function fetchTournaments() {
      setLoadingTournaments(true)
      try {
        const response = await fetch("http://127.0.0.1:8000/api/getTournaments")
        if (!response.ok) throw new Error("Failed to fetch tournaments")
        const data = await response.json()
        setTournaments(data)
      } catch (error) {
        console.error("Error fetching tournaments:", error)
        alert("Failed to load tournaments")
      } finally {
        setLoadingTournaments(false)
      }
    }

    fetchTournaments()
  }, [])

  // Fetch teams when tournament is selected
  useEffect(() => {
    if (!selectedTournament) return

    async function fetchTeams() {
      setLoadingTeams(true)
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/tournamentTeams/${selectedTournament}`)
        if (!response.ok) throw new Error("Failed to fetch teams")
        const data = await response.json()
        console.log(data)
        setTeams(data)
      } catch (error) {
        console.error("Error fetching teams:", error)
        alert("Failed to load teams")
      } finally {
        setLoadingTeams(false)
      }
    }

    fetchTeams()
  }, [selectedTournament])

  // Fetch players when teams are selected
  useEffect(() => {
    if (!selectedTeam1 && !selectedTeam2) return

    async function fetchPlayers() {
      setLoadingPlayers(true)

      try {
        // Fetch team 1 players if selected
        if (selectedTeam1) {
          const response1 = await fetch(`http://127.0.0.1:8000/api/getTeamInfo/${selectedTeam1}`)
          if (!response1.ok) throw new Error("Failed to fetch team 1 players")
          const data1 = await response1.json()
          setTeam1Players(data1.players)

          // Initialize stats for team 1 players
          setTeam1Stats(
            data1.players.map((player: Player) => ({
              playerId: player.id,
              playerName: player.in_game_name,
              kills: 0,
              deaths: 0,
              assists: 0,
            })),
          )
        }

        // Fetch team 2 players if selected
        if (selectedTeam2) {
          const response2 = await fetch(`http://127.0.0.1:8000/api/getTeamInfo/${selectedTeam2}`)
          if (!response2.ok) throw new Error("Failed to fetch team 2 players")
          const data2 = await response2.json()
          setTeam2Players(data2.players)

          // Initialize stats for team 2 players
          setTeam2Stats(
            data2.players.map((player: Player) => ({
              playerId: player.id,
              playerName: player.in_game_name,
              kills: 0,
              deaths: 0,
              assists: 0,
            })),
          )
        }
      } catch (error) {
        console.error("Error fetching players:", error)
        alert("Failed to load players")
      } finally {
        setLoadingPlayers(false)
      }
    }

    fetchPlayers()
  }, [selectedTeam1, selectedTeam2])

  // Handle tournament selection
  const handleTournamentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTournament(e.target.value)
    setSelectedTeam1("")
    setSelectedTeam2("")
    setTeams([])
    setTeam1Players([])
    setTeam2Players([])
    setTeam1Stats([])
    setTeam2Stats([])
  }

  // Handle team selection
  const handleTeam1Change = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTeam1(e.target.value)
  }

  const handleTeam2Change = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTeam2(e.target.value)
  }

  // Handle stat changes for team 1
  const handleTeam1StatChange = (playerId: number, field: "kills" | "deaths" | "assists", value: number) => {
    setTeam1Stats((prevStats) =>
      prevStats.map((stat) => (stat.playerId === playerId ? { ...stat, [field]: value } : stat)),
    )
  }

  // Handle stat changes for team 2
  const handleTeam2StatChange = (playerId: number, field: "kills" | "deaths" | "assists", value: number) => {
    setTeam2Stats((prevStats) =>
      prevStats.map((stat) => (stat.playerId === playerId ? { ...stat, [field]: value } : stat)),
    )
  }

  // Navigate to next step
  const nextStep = () => {
    if (currentStep === 1 && !selectedTournament) {
      alert("Please select a tournament")
      return
    }

    if (currentStep === 2 && (!selectedTeam1 || !selectedTeam2)) {
      alert("Please select both teams")
      return
    }

    setCurrentStep((prev) => prev + 1)
  }

  // Navigate to previous step
  const prevStep = () => {
    setCurrentStep((prev) => prev - 1)
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate that we have stats for all players
    if (team1Stats.length === 0 || team2Stats.length === 0) {
      alert("Please ensure all player statistics are entered")
      return
    }

    setLoading(true)

    // Prepare data for submission
    const matchData = {
      tournamentId: selectedTournament,
      team1Id: selectedTeam1,
      team2Id: selectedTeam2,
      team1Score: team1Score,
      team2Score: team2Score,
      gameName: gameName,
      playerStats: [...team1Stats, ...team2Stats],
    }
    console.log(matchData)
    try {
      const response = await api.post(
        "http://127.0.0.1:8000/api/createResults",
        matchData,
        {
          headers: {"Content-Type": "application/json"},
        }
      );
    
      // No need to check response.ok – if we're here, it's a 2xx
      alert("Match results submitted successfully!");
    } catch (error) {
      console.error("Error submitting match results:", error);
      alert("Failed to submit match results");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative min-h-screen w-full bg-purple-900">
      <Navigation />

      <div className="container mx-auto py-10 px-4">
        <div className="max-w-3xl mx-auto bg-purple-500 p-8 rounded-lg">
          <h1 className="text-2xl font-bold text-white mb-6 text-center">Match Results Entry</h1>

          <div className="flex justify-between mb-8">
            <div className={`w-1/3 text-center ${currentStep === 1 ? "text-white font-bold" : "text-purple-200"}`}>
              1. Select Tournament
            </div>
            <div className={`w-1/3 text-center ${currentStep === 2 ? "text-white font-bold" : "text-purple-200"}`}>
              2. Select Teams
            </div>
            <div className={`w-1/3 text-center ${currentStep === 3 ? "text-white font-bold" : "text-purple-200"}`}>
              3. Enter Stats
            </div>
          </div>


{/* FIRST STEP */}


          <form onSubmit={handleSubmit}>
            {currentStep === 1 && (
              <div className="space-y-4">
                <div className="flex flex-row gap-4">
                  <div className="flex-1">
                    <label htmlFor="tournament" className="text-white mb-2 block">
                      Select Tournament
                    </label>
                    <select
                      id="tournament"
                      value={selectedTournament}
                      onChange={handleTournamentChange}
                      className="h-12 w-full rounded-lg p-2 text-zinc-950"
                      disabled={loadingTournaments}
                      required
                    >
                      <option value="">Select a tournament</option>
                      {tournaments.map((tournament) => (
                        <option key={tournament.id} value={tournament.id}>
                          {tournament.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex-1">
                    <label htmlFor="gameName" className="text-white mb-2 block">
                      Game Name
                    </label>
                    <input
                      id="gameName"
                      type="text"
                      value={gameName}
                      onChange={(e) => setGameName(e.target.value)}
                      className="h-12 w-full rounded-lg p-2 text-zinc-950"
                      placeholder="Enter game name"
                      disabled={loadingTournaments}
                      required
                    />
                  </div>
                </div>

                {loadingTournaments && (
                  <div className="flex items-center justify-center mt-4">
                    <span className="ml-2 text-white">Loading tournaments...</span>
                  </div>
                )}

                <div className="flex justify-end mt-6">
                  <button
                    type="button"
                    onClick={nextStep}
                    className="bg-white px-6 py-2 rounded-md hover:bg-slate-300 transition-colors text-purple-500"
                    disabled={!selectedTournament || !gameName || loadingTournaments}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}


{/* SECOND STEP */}



            {currentStep === 2 && (
              <div className="space-y-4">
                <div className="flex flex-row gap-4">
                  <div className="flex-1">
                    <label htmlFor="team1" className="text-white mb-2 block">
                      Team 1
                    </label>
                    <select
                      id="team1"
                      value={selectedTeam1}
                      onChange={handleTeam1Change}
                      className="h-12 w-full rounded-lg p-2 text-zinc-950"
                      disabled={loadingTeams}
                      required
                    >
                      <option value="">Select team 1</option>
                      {teams.map((team) => (
                        <option key={team.id} value={team.id} disabled={team.id.toString() === selectedTeam2}>
                          {team.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex-1">
                    <label htmlFor="team2" className="text-white mb-2 block">
                      Team 2
                    </label>
                    <select
                      id="team2"
                      value={selectedTeam2}
                      onChange={handleTeam2Change}
                      className="h-12 w-full rounded-lg p-2 text-zinc-950"
                      disabled={loadingTeams}
                      required
                    >
                      <option value="">Select team 2</option>
                      {teams.map((team) => (
                        <option key={team.id} value={team.id} disabled={team.id.toString() === selectedTeam1}>
                          {team.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {loadingTeams && (
                  <div className="flex items-center justify-center mt-4">
                    <span className="ml-2 text-white">Loading teams...</span>
                  </div>
                )}

                <div className="flex justify-between mt-6">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="bg-white px-6 py-2 rounded-md hover:bg-slate-300 transition-colors text-purple-500"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={nextStep}
                    className="bg-white px-6 py-2 rounded-md hover:bg-slate-300 transition-colors text-purple-500"
                    disabled={!selectedTeam1 || !selectedTeam2 || loadingTeams}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}



  {/* LAST STEP */}



            {currentStep === 3 && (
              <div>
                {loadingPlayers ? (
                  <div className="flex items-center justify-center mt-4">
                    <span className="ml-2 text-white">Loading players...</span>
                  </div>
                ) : (
                  <>
                    <div className="mb-6">
                      <div className="flex flex-row space-x-2">
                        <h3 className="text-xl font-semibold text-white mb-4">
                          {teams.find((t) => t.id.toString() === selectedTeam1)?.name || "Team 1"} 
                        </h3>
                        <input
                          type="number"
                          min="0"
                          value={team1Score}
                          onChange={(e) =>
                            setTeam1Score(e.target.value)
                          }
                          className="h-10 rounded p-2 text-zinc-950 mb-4"
                          required
                        />
                      </div>
                      <div className="bg-purple-600 p-4 rounded-lg">
                        <div className="grid grid-cols-4 gap-2 font-bold text-white mb-2 text-center">
                          <div>Player</div>
                          <div>Kills</div>
                          <div>Deaths</div>
                          <div>Assists</div>
                        </div>
                        {team1Stats.map((stat) => (
                          <div key={stat.playerId} className="grid grid-cols-4 gap-2 mb-2">
                            <div className="text-white self-center">{stat.playerName}</div>
                            <input
                              type="number"
                              min="0"
                              value={stat.kills}
                              onChange={(e) =>
                                handleTeam1StatChange(stat.playerId, "kills", Number.parseInt(e.target.value) || 0)
                              }
                              className="h-10 rounded p-2 text-zinc-950"
                              required
                            />
                            <input
                              type="number"
                              min="0"
                              value={stat.deaths}
                              onChange={(e) =>
                                handleTeam1StatChange(stat.playerId, "deaths", Number.parseInt(e.target.value) || 0)
                              }
                              className="h-10 rounded p-2 text-zinc-950"
                              required
                            />
                            <input
                              type="number"
                              min="0"
                              value={stat.assists}
                              onChange={(e) =>
                                handleTeam1StatChange(stat.playerId, "assists", Number.parseInt(e.target.value) || 0)
                              }
                              className="h-10 rounded p-2 text-zinc-950"
                              required
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mb-6">
                      <div className="flex flex-row space-x-2">
                        <h3 className="text-xl font-semibold text-white mb-4">
                          {teams.find((t) => t.id.toString() === selectedTeam2)?.name || "Team 2"}
                        </h3>
                        <input
                          type="number"
                          min="0"
                          value={team2Score}
                          onChange={(e) =>
                            setTeam2Score(e.target.value)
                          }
                          className="h-10 rounded p-2 text-zinc-950 mb-4"
                          required
                        />                        
                      </div>
                      <div className="bg-purple-600 p-4 rounded-lg">
                        <div className="grid grid-cols-4 gap-2 font-bold text-white mb-2 text-center">
                          <div>Player</div>
                          <div>Kills</div>
                          <div>Deaths</div>
                          <div>Assists</div>
                        </div>
                        {team2Stats.map((stat) => (
                          <div key={stat.playerId} className="grid grid-cols-4 gap-2 mb-2">
                            <div className="text-white self-center">{stat.playerName}</div>
                            <input
                              type="number"
                              min="0"
                              value={stat.kills}
                              onChange={(e) =>
                                handleTeam2StatChange(stat.playerId, "kills", Number.parseInt(e.target.value) || 0)
                              }
                              className="h-10 rounded p-2 text-zinc-950"
                              required
                            />
                            <input
                              type="number"
                              min="0"
                              value={stat.deaths}
                              onChange={(e) =>
                                handleTeam2StatChange(stat.playerId, "deaths", Number.parseInt(e.target.value) || 0)
                              }
                              className="h-10 rounded p-2 text-zinc-950"
                              required
                            />
                            <input
                              type="number"
                              min="0"
                              value={stat.assists}
                              onChange={(e) =>
                                handleTeam2StatChange(stat.playerId, "assists", Number.parseInt(e.target.value) || 0)
                              }
                              className="h-10 rounded p-2 text-zinc-950"
                              required
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                <div className="flex justify-between mt-6">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="bg-white px-6 py-2 rounded-md hover:bg-slate-300 transition-colors text-purple-500"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="bg-white px-6 py-2 rounded-md hover:bg-slate-300 transition-colors text-purple-500"
                    disabled={loading || loadingPlayers}
                  >
                    {loading ? "Submitting..." : "Submit Match Results"}
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}