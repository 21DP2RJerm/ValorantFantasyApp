"use client"
import type React from "react"
import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import Navigation from "../navigation"

interface Team {
  id: number
  name: string
}

export default function CreateTeam() {
  const [playerName, setPlayerName] = useState("")
  const [playerLastName, setPlayerLastName] = useState("")
  const [playerIGN, setPlayerIGN] = useState("")
  const [playerTeam, setPlayerTeam] = useState("")
  const [playerLogo, setPlayerLogo] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [teams, setTeams] = useState<Team[]>([])
  const router = useRouter()

  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setPlayerLogo(e.target.files[0])
    }
  }

  useEffect(() => {
    async function fetchTeams() {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/allTeams/`)
        const data = await response.json()
        setTeams(data)
      } catch (error) {
        console.error("Error fetching teams:", error)
      }
    }

    fetchTeams()
  }, []) // Empty dependency array to fetch only once

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!playerName || !playerLastName || !playerIGN || !playerTeam || !playerLogo) {
      alert("Please fill all fields!")
      return
    }

    setLoading(true)

    const formData = new FormData()
    formData.append("name", playerName)
    formData.append("last_name", playerLastName)
    formData.append("in_game_name", playerIGN)
    formData.append("team_id", String(playerTeam))
    formData.append("logo", playerLogo)

    try {
      const response = await fetch("http://127.0.0.1:8000/api/createPlayer", {
        method: "POST",
        body: formData,
      })

      const text = await response.text() // Read response as text
      console.log("Raw Response:", text) // Log response before JSON parsing

      alert("Player created successfully!")
    } catch (error) {
      console.error("Error:", error)
      alert("Failed to create player.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative flex justify-center items-center h-screen w-screen bg-purple-900">
      <Navigation />
      <form onSubmit={handleSubmit} className="flex flex-col items-center z-1 relative bg-purple-500 p-10 rounded-lg">
        <input
          type="text"
          name="playerName"
          placeholder="Enter player name"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          className="h-12 w-64 mt-8 mb-4 rounded-lg p-4 text-zinc-950"
          disabled={loading}
          required
        />
        <input
          type="text"
          name="playerLastName"
          placeholder="Enter last name"
          value={playerLastName}
          onChange={(e) => setPlayerLastName(e.target.value)}
          className="h-12 w-64 my-4 rounded-lg p-4 text-zinc-950"
          disabled={loading}
          required
        />
        <input
          type="text"
          name="playerIGN"
          placeholder="Enter player in game name"
          value={playerIGN}
          onChange={(e) => setPlayerIGN(e.target.value)}
          className="h-12 w-64 my-4 rounded-lg p-4 text-zinc-950"
          disabled={loading}
          required
        />

        {/* Team Selection Dropdown */}
        <select
          name="playerTeam"
          value={playerTeam}
          onChange={(e) => setPlayerTeam(e.target.value)}
          className="h-12 w-64 my-4 rounded-lg p-4 text-zinc-950"
          disabled={loading}
          required
        >
          <option value="">Select a team</option>
          {teams.map((team) => (
            <option key={team.id} value={team.id.toString()}>
              {team.name}
            </option>
          ))}
        </select>

        <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
        <button
          type="button"
          className="bg-white px-6 py-2 rounded-md hover:bg-slate-300 transition-colors text-purple-500 mt-1 mb-6"
          disabled={loading}
          onClick={() => fileInputRef.current?.click()}
        >
          Upload Player Logo
        </button>
        {playerLogo && <p className="text-white">Selected File: {playerLogo.name}</p>}
        <button
          type="submit"
          className="bg-white px-6 py-2 rounded-md hover:bg-slate-300 transition-colors text-purple-500 mt-1"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Player"}
        </button>
      </form>
    </div>
  )
}
