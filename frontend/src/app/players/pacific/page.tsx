"use client";

import Image from "next/image"
import React, { useState } from 'react';
import Link from "next/link";
import { useRouter } from 'next/navigation';

export default function Home() {
    return(
        <div className="relative flex justify-center items-center h-screen w-screen space bg-purple-900 ">
            <div className="absolute bg-purple-700 h-screen w-[15%] left-0 flex justify-center items-center">
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
                    <Link href="/home" className="relative p-2 col-span-1 text-2xl">
                        Home
                    </Link>
                    <Link href="/leaderboard" className="relative p-2 col-span-1 text-2xl ">
                        Leaderboard
                    </Link>
                    <Link href="/myteams" className="relative p-2 col-span-1 text-2xl ">
                        My Teams
                    </Link>
                    <Link href="/players" className="relative p-2 col-span-1 text-2xl ">
                        Players
                    </Link>
                    <Link href="/profile" className="relative p-2 col-span-1 text-2xl ">
                        Profile
                    </Link>
                </div>
            </div>
        </div>
    )

}
