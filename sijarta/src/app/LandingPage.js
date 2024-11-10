// src/app/landing/page.js
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LandingPage() {
  const router = useRouter();
  const [view, setView] = useState(''); // State to toggle between 'login', 'register', and the default view
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Pengguna');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  // Handle Login
  const handleLogin = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find((u) => u.phone === phone && u.password === password);

    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      router.push('/');
    } else {
      setError('Invalid phone number or password');
    }
  };

  // Handle Register
  const handleRegister = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const existingUser = users.find((u) => u.phone === phone);

    if (existingUser) {
      setError('Phone number already registered. Please login.');
      return;
    }

    const newUser = { role, name, phone, password };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('user', JSON.stringify(newUser));
    router.push('/');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-sm w-full">
        <h1 className="text-2xl font-bold mb-6">SIJARTA By Based</h1>

        {/* Conditionally Render Buttons or Forms */}
        {view === '' && (
          <div className="space-y-4">
            <button
              onClick={() => setView('login')}
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
            >
              Login
            </button>
            <button
              onClick={() => setView('register')}
              className="w-full border border-blue-500 text-blue-500 py-2 rounded-lg hover:bg-blue-500 hover:text-white"
            >
              Register
            </button>
          </div>
        )}

        {/* Login Form */}
        {view === 'login' && (
          <form onSubmit={handleLogin} className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">Login</h2>
            {error && <p className="text-red-500">{error}</p>}
            <input
              type="text"
              placeholder="No HP"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="border p-2 w-full rounded"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border p-2 w-full rounded"
              required
            />
            <button type="submit" className="bg-blue-500 text-white py-2 w-full rounded-lg">
              Login
            </button>
            <button
              onClick={() => setView('')}
              className="text-blue-500 mt-2 hover:underline"
            >
              Back
            </button>
          </form>
        )}

        {/* Register Form */}
        {view === 'register' && (
          <form onSubmit={handleRegister} className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">Register</h2>
            {error && <p className="text-red-500">{error}</p>}
            <select
              onChange={(e) => setRole(e.target.value)}
              value={role}
              className="border p-2 w-full rounded"
              required
            >
              <option value="Pengguna">Pengguna</option>
              <option value="Pekerja">Pekerja</option>
            </select>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border p-2 w-full rounded"
              required
            />
            <input
              type="text"
              placeholder="No HP"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="border p-2 w-full rounded"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border p-2 w-full rounded"
              required
            />
            <button type="submit" className="bg-blue-500 text-white py-2 w-full rounded-lg">
              Register
            </button>
            <button
              onClick={() => setView('')}
              className="text-blue-500 mt-2 hover:underline"
            >
              Back
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
