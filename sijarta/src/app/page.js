// src/app/page.js

"use client";

import { useRouter } from 'next/navigation';
import pool from "../utils/postgres";

export default function LandingPage() {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-sm w-full">
        <h1 className="text-2xl text-black font-bold mb-6">SIJARTA By Based</h1>

        <div className="space-y-4">
          <button
            onClick={() => router.push('/login')}
            className="w-full border border-blue-500 text-blue-500 py-2 rounded-lg"
          >
            Login
          </button>
          <button
            onClick={() => router.push('/register')}
            className="w-full border border-blue-500 text-blue-500 py-2 rounded-lg"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}
