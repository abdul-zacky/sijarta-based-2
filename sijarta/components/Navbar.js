// components/navbar.js
"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

const Navbar = () => {
  // State to hold the user role; this could come from an auth context or global state
  const [role, setRole] = useState('Guest'); // Possible roles: 'Guest', 'Pengguna', 'Pekerja'
  const [name, setName] = useState('');
  const router = useRouter();

  useEffect(() => {
    // Simulate fetching the logged-in user's data
    const userData = JSON.parse(localStorage.getItem('user')) || { role: 'Guest' };
    setRole(userData.role);
    setName(userData.name);
  }, []);

  const handleLogout = () => {
    // Clear user session (example)
    localStorage.removeItem('user');
    router.push('/');
    setRole('Guest');
    setName('');
  };

  return (
    <nav className="w-full bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-white font-bold text-xl">
          Sijarta by BASED
        </Link>
        <div className="space-x-4 flex items-center">
          {role === 'Guest' && (
            <>
              <Link href="/login" className="text-gray-300 hover:text-white">Login</Link>
              <Link href="/register" className="text-gray-300 hover:text-white">Register</Link>
            </>
          )}
          {role === 'Pengguna' && (
            <>
              <span className="text-gray-300">{`Role: ${role} | ${name}`}</span>
              <Link href="/services" className="text-gray-300 hover:text-white">Homepage</Link>
              <Link href="/mypay" className="text-gray-300 hover:text-white">MyPay</Link>
              <Link href="/orders" className="text-gray-300 hover:text-white">Kelola Pesanan Saya</Link>
              <Link href="/discounts" className="text-gray-300 hover:text-white">Diskon</Link>
              <Link href="/profile" className="text-gray-300 hover:text-white">Profile</Link>
              <Link href="/login" className="text-gray-300 hover:text-white"><button onClick={handleLogout} className="text-gray-300 hover:text-white">Logout</button></Link>
            </>
          )}
          {role === 'Pekerja' && (
            <>
              <span className="text-gray-300">{`Role: ${role} | ${name}`}</span>
              <Link href="/services" className="text-gray-300 hover:text-white">Homepage</Link>
              <Link href="/work-management" className="text-gray-300 hover:text-white">Kelola Pekerjaan Saya</Link>
              <Link href="/work-status" className="text-gray-300 hover:text-white">Kelola Status Pekerjaan</Link>
              <Link href="/mypay" className="text-gray-300 hover:text-white">MyPay</Link>
              <Link href="/profile" className="text-gray-300 hover:text-white">Profile</Link>
              <Link href="/login" className="text-gray-300 hover:text-white"><button onClick={handleLogout} className="text-gray-300 hover:text-white">Logout</button></Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
