"use client";

import { useState, useEffect } from 'react';

export default function Profile() {
  const [user, setUser] = useState({ role: 'Guest', name: '' });
  const [profile, setProfile] = useState({
    phone: '',
    address: '',
    bankName: '',
    accountNumber: '',
    npwp: '',
  });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user')) || { role: 'Guest' };
    setUser(storedUser);
    setProfile({
      phone: storedUser.phone || '',
      address: storedUser.address || '',
      bankName: storedUser.bankName || '',
      accountNumber: storedUser.accountNumber || '',
      npwp: storedUser.npwp || '',
    });
  }, []);

  const handleChange = (field) => (e) => {
    setProfile({ ...profile, [field]: e.target.value });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const updatedUser = { ...user, ...profile };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    alert('Profile updated');
  };

  return (
    <div className="container mx-auto max-w-md p-6 bg-white rounded-lg shadow-lg mt-8">
      <h1 className="text-2xl text-black font-bold text-center mb-4">Profile</h1>
      {user.role === 'Guest' ? (
        <p className="text-center text-black text-gray-500">Please log in to view your profile.</p>
      ) : (
        <form onSubmit={handleUpdate} className="space-y-4 text-black">
          <p>Role: {user.role}</p>
          <p>Name: {user.name}</p>
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
          {user.role === 'Pekerja' && (
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
