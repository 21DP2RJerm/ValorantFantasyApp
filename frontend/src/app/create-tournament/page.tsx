"use client"

import Image from "next/image"
import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function CreateTournament() {
  const [name, setName] = useState("")
  const [type, setType] = useState("")
  const [start_date, setStartDate] = useState("")
  const [end_date, setEndDate] = useState("")
  const [location, setLocation] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !type || !start_date || !end_date || !location) {
      alert("Please fill all fields!")
      return
    }

    setLoading(true)
    setError(null)

    const formData = new FormData()
    formData.append("name", name)
    formData.append("type", type)
    formData.append("startDate", start_date)
    formData.append("endDate", end_date)
    formData.append("location", location)

    console.log("Submitting tournament data:", {
      name,
      type,
      start_date,
      end_date,
      location,
    })

    try {
      // Add credentials: 'include' to send cookies if your API uses session authentication
      const response = await fetch("http://127.0.0.1:8000/api/createTournament", {
        method: "POST",
        body: formData,
      })

      console.log("Response status:", response.status)

      if (!response.ok) {
        const errorText = await response.text()
        console.error("Error response:", errorText)
        throw new Error(`Failed to create tournament: ${errorText}`)
      }

      const data = await response.json()
      console.log("Success response:", data)

      alert("Tournament created successfully!")
      router.push("/home") // Redirect to home page after successful creation
    } catch (error: any) {
      console.error("Tournament creation failed:", error)
      setError(error.message || "Failed to create tournament")
      alert(error.message || "Failed to create tournament")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative flex justify-center items-center h-screen w-screen bg-purple-900">
      <div className="absolute bg-purple-700 h-screen w-[15%] left-0 flex justify-center items-center border-r-8 border-white">
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
          <Link href="/profile" className="relative p-2 col-span-1 text-2xl text-white">
            Profile
          </Link>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col items-center z-1 relative bg-purple-500 p-10 rounded-lg">
        <h1 className="text-2xl font-bold text-white mb-4">Create Tournament</h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 w-full">{error}</div>
        )}

        <input
          type="text"
          name="name"
          placeholder="Enter tournament name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="h-12 w-64 mt-4 mb-4 rounded-lg p-4 text-zinc-950"
          disabled={loading}
          required
        />
        <select
          name="type"
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="h-12 w-64 my-4 rounded-lg p-4 text-zinc-950"
          disabled={loading}
          required
        >
          <option value="">Select tournament type</option>
          <option value="Masters">Masters</option>
          <option value="Champions">Champions</option>
          <option value="Kickoff">Kickoff</option>
          <option value="Challengers">Regular Season</option>
        </select>
          <input
            id="startDate"
            type="date"
            name="startDate"
            value={start_date}
            onChange={(e) => setStartDate(e.target.value)}
            className="h-12 w-64 my-4 rounded-lg p-4 text-zinc-950"
            disabled={loading}
            required
          />
          <input
            id="endDate"
            type="date"
            name="endDate"
            value={end_date}
            onChange={(e) => setEndDate(e.target.value)}
            className="h-12 w-64 my-4 rounded-lg p-4 text-zinc-950"
            disabled={loading}
            required
          />
        <input
          type="text"
          name="location"
          placeholder="Enter tournament location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="h-12 w-64 my-4 rounded-lg p-4 text-zinc-950"
          disabled={loading}
          required
        />
        <button
          type="submit"
          className="bg-white px-6 py-2 rounded-md hover:bg-slate-300 transition-colors text-purple-500 mt-4 font-semibold"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Tournament"}
        </button>
      </form>
    </div>
  )
}
