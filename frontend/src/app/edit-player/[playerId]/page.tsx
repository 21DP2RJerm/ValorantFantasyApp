"use client"
import type React from "react"
import { useState, useRef, useEffect } from "react"
import { useRouter,useParams } from "next/navigation"
import Navigation from "../../navigation"
import api from "axios"


export default function EditTeam() {
  const {playerId} = useParams()
  const [playerName, setPlayerName] = useState("")
  const [playerLastName, setPlayerLastName] = useState("")
  const [playerIGN, setPlayerIGN] = useState("")
  const [playerTeam, setPlayerTeam] = useState("")
  const [playerLogo, setPlayerLogo] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [teams, setTeams] = useState([])
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setPlayerLogo(e.target.files[0])
    }
  }

  useEffect(() => {
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
            router.push("/")
          }
        } else {
          router.push("/home")
        }
      } catch (error) {
        console.error("Error checking admin access:", error)
        router.push("/")
      } finally {
        setIsLoading(false)
      }
    }
  
    async function fetchPlayer() {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/getPlayer/${playerId}`)
        const data = await response.json()
        setPlayerName(data.name)
        setPlayerLastName(data.last_name)
        setPlayerIGN(data.in_game_name)
        setPlayerTeam(data.team_id)
        setPlayerLogo(data.logo)
      } catch (error) {
        console.error("Error fetching teams:", error)
      }
    }
    async function fetchTeams() {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/allTeams/`)
        const data = await response.json()
        setTeams(data)
      } catch (error) {
        console.error("Error fetching teams:", error)
      }
    }
    checkAdminAccess()
    fetchTeams()
    fetchPlayer()
  }, []) 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setLoading(true)


    const formData = new FormData()
    formData.append("name", playerName)
    formData.append("last_name", playerLastName)
    formData.append("in_game_name", playerIGN)
    formData.append("team_id", playerTeam)

    console.log(formData)
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/updatePlayer/${playerId}`, {
        method: "POST", 
        headers: {
          Accept: "application/json",
        },
        body: formData,
      })
      const text = await response.text()
      console.log("Raw Response:", text) 

      alert("Player updated successfully!")
      router.push(`/player/${playerId}`)
    } catch (error) {
      console.error("Error:", error)
      alert("Failed to update player.")
    } finally {
      setLoading(false)
    }
  }
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen w-screen bg-gray-900">
        <div className="text-white text-2xl">Verifying access...</div>
      </div>
    )
  }

  return (
    <div className="relative flex justify-center items-center h-screen w-screen bg-gray-900">
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

        <button
          type="submit"
          className="bg-white px-6 py-2 rounded-md hover:bg-slate-300 transition-colors text-purple-500 mt-1"
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Player"}
        </button>
      </form>
    </div>
  )
}
