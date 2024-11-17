// src/app/login/page.js
"use client";

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Login() {
  const router = useRouter();
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find((u) => u.phone === phone && u.password === password);

    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      router.push('/landing_page');
    } else {
      setError('Invalid phone number or password');
    }
  };

  return (
    <div className="container mx-auto max-w-md p-8 bg-white rounded-lg shadow-lg mt-20">
      <h1 className="text-2xl font-bold text-center mb-4">Login</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleLogin} className="space-y-4">
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
        <button type="submit" className="bg-blue-600 text-black px-4 py-2 w-full rounded">
          Login
        </button>
      </form>
    </div>
  );
}
