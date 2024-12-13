"use client";

import { useState, useEffect } from 'react';
import { useAuth } from '/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function Profile() {
  const { user } = useAuth();
  const router = useRouter();
  const [profile, setProfile] = useState({
    phone: '',
    address: '',
    bankName: '',
    accountNumber: '',
    npwp: '',
    rating: 0,
    jml_pesanan_selesai: 0,
    role: 'Guest',
    name: '',
  });

  useEffect(() => {
    if (!user) {
      // If no user is logged in, redirect or show a message
      return;
    }

    const fetchProfile = async () => {
      const res = await fetch(`/api/profile?id=${user.id}`);
      if (res.ok) {
        const data = await res.json();
        setProfile({
          phone: data.phone || '',
          address: data.address || '',
          bankName: data.bankName || '',
          accountNumber: data.accountNumber || '',
          npwp: data.npwp || '',
          rating: data.rating || 0,
          jml_pesanan_selesai: data.jml_pesanan_selesai || 0,
          role: data.role || 'Pengguna',
          name: data.name || '',
        });
      } else {
        // Handle error, maybe user not found
        console.error('Failed to load profile');
      }
    };

    fetchProfile();
  }, [user]);

  if (!user) {
    return (
      <div className="container mx-auto max-w-md p-6 bg-white rounded-lg shadow-lg mt-8">
        <h1 className="text-2xl text-black font-bold text-center mb-4">Profile</h1>
        <p className="text-center text-black text-gray-500">Please log in to view your profile.</p>
      </div>
    );
  }

  const handleChange = (field) => (e) => {
    setProfile((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const payload = {
      id: user.id,
      role: profile.role,
      phone: profile.phone,
      address: profile.address,
      bankName: profile.bankName,
      accountNumber: profile.accountNumber,
      npwp: profile.npwp,
    };
    const res = await fetch('/api/profile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (res.ok) {
      alert('Profile updated successfully');
    } else {
      alert('Failed to update profile');
    }
  };

  return (
    <div className="container mx-auto max-w-md p-6 bg-white rounded-lg shadow-lg mt-8">
      <h1 className="text-2xl text-black font-bold text-center mb-4">Profile</h1>
      {profile.role === 'Guest' ? (
        <p className="text-center text-black text-gray-500">Please log in to view your profile.</p>
      ) : (
        <form onSubmit={handleUpdate} className="space-y-4 text-black">
          <div className="flex justify-center mb-4">
            <img
              src={"https://www.svgrepo.com/show/503076/profile.svg"}
              alt="Profile Picture"
              className="w-24 h-24 rounded-full border"
            />
          </div>
          <p>Role: {profile.role}</p>
          <p>Name: {profile.name}</p>
          {profile.role === 'Pekerja' && (
            <>
              <p>Ratings: {profile.rating}/10</p>
              <p>Jumlah pesanan selesai: {profile.jml_pesanan_selesai}</p>
            </>
          )}
          <p>No HP:</p>
          <input
            type="text"
            aria-label="Nomor HP"
            placeholder="No HP"
            value={profile.phone}
            onChange={handleChange('phone')}
            className="border p-2 w-full rounded"
            required
          />
          <p>Alamat:</p>
          <input
            type="text"
            placeholder="Alamat"
            value={profile.address}
            onChange={handleChange('address')}
            className="border p-2 w-full rounded"
          />
          {profile.role === 'Pekerja' && (
            <>
              <p>Nama Bank:</p>
              <select
                value={profile.bankName}
                onChange={handleChange('bankName')}
                className="border p-2 w-full rounded"
                required
              >
                <option value="">Nama Bank</option>
                <option value="GoPay">GoPay</option>
                <option value="OVO">OVO</option>
                <option value="Virtual Account BCA">Virtual Account BCA</option>
                <option value="Virtual Account BNI">Virtual Account BNI</option>
                <option value="Virtual Account Mandiri">Virtual Account Mandiri</option>
              </select>
              <p>No Rekening:</p>
              <input
                type="text"
                placeholder="No Rekening"
                value={profile.accountNumber}
                onChange={handleChange('accountNumber')}
                className="border p-2 w-full rounded"
              />
              <p>NPWP:</p>
              <input
                type="text"
                placeholder="NPWP"
                value={profile.npwp}
                onChange={handleChange('npwp')}
                className="border p-2 w-full rounded"
              />
            </>
          )}

          <button type="submit" className="bg-blue-600 text-white px-4 py-2 w-full rounded">
            Update Profile
          </button>
        </form>
      )}
    </div>
  );
}