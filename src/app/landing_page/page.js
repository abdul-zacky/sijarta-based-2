"use client";

import { useRouter } from 'next/navigation';

export default function LandingPage() {
  // const router = useRouter();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md w-full">
        <h1 className="text-3xl font-extrabold mb-6 text-gray-800">Welcome to SIJARTA</h1>
        <p className="text-gray-600 mb-8">
          Your one-stop solution for managing services efficiently. Join us today!
        </p>

        {/* <div className="space-y-4">
          <button
            onClick={() => router.push('/login')}
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
          >
            Login
          </button>
          <button
            onClick={() => router.push('/register')}
            className="w-full bg-gray-100 text-blue-500 border border-blue-500 py-2 rounded-lg hover:bg-blue-500 hover:text-white"
          >
            Register
          </button>
        </div> */}
      </div>
    </div>
  );
}
