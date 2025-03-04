"use client";

import Image from "next/image";
import React, { useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CreateTeam() {
    const [teamName, setTeamName] = useState("");
    const [teamRegion, setTeamRegion] = useState("");
    const [teamLogo, setTeamLogo] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setTeamLogo(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!teamName || !teamRegion || !teamLogo) {
            alert("Please fill all fields!");
            return;
        }

        setLoading(true);

        const formData = new FormData();
        formData.append("name", teamName);
        formData.append("region", teamRegion);
        formData.append("logo", teamLogo);

        try {
            const response = await fetch("http://127.0.0.1:8000/api/createTeam", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                throw new Error("Failed to create team");
            }

            const data = await response.json();
            alert("Team created successfully!");
            router.push("/myteams"); // Redirect to teams page
        } catch (error) {
            console.error("Error:", error);
            alert("Failed to create team.");
        } finally {
            setLoading(false);
        }
    };

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
                <input
                    type="text"
                    name="teamName"
                    placeholder="Enter team name"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    className="h-12 w-64 mt-8 mb-4 rounded-lg p-4 text-zinc-950"
                    disabled={loading}
                    required
                />
                <input
                    type="text"
                    name="teamRegion"
                    placeholder="Enter team region"
                    value={teamRegion}
                    onChange={(e) => setTeamRegion(e.target.value)}
                    className="h-12 w-64 my-4 rounded-lg p-4 text-zinc-950"
                    disabled={loading}
                    required
                />
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                />
                <button
                    type="button"
                    className="bg-white px-6 py-2 rounded-md hover:bg-slate-300 transition-colors text-purple-500 mt-1 mb-6"
                    disabled={loading}
                    onClick={() => fileInputRef.current?.click()}
                >
                    Upload Team Logo
                </button>
                {teamLogo && <p className="text-white">Selected File: {teamLogo.name}</p>}
                <button
                    type="submit"
                    className="bg-white px-6 py-2 rounded-md hover:bg-slate-300 transition-colors text-purple-500 mt-1"
                    disabled={loading}
                >
                    {loading ? "Creating..." : "Create Team"}
                </button>
            </form>
        </div>
    );
}
