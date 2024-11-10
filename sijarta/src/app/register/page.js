// src/app/register/page.js

"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();
  const [role, setRole] = useState('Pengguna');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState('');
  const [phone, setPhone] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [address, setAddress] = useState('');
  const [bankName, setBankName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [npwp, setNpwp] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [error, setError] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users') || '[]');

    // Check for unique phone number
    if (users.some((user) => user.phone === phone)) {
      setError('Phone number already registered.');
      return;
    }

    // Check for unique NPWP for "Pekerja"
    if (role === 'Pekerja' && users.some((user) => user.npwp === npwp)) {
      setError('NPWP already registered.');
      return;
    }

    const newUser = { role, name, password, gender, phone, birthDate, address, bankName, accountNumber, npwp, photoUrl };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    router.push('/login');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleRegister} className="bg-white p-8 rounded-lg shadow-md max-w-md w-full space-y-4">
        <h1 className="text-2xl font-bold mb-4">Register</h1>
        {error && <p className="text-red-500">{error}</p>}
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="border p-2 w-full rounded"
        >
          <option value="Pengguna">Pengguna</option>
          <option value="Pekerja">Pekerja</option>
        </select>

        <input
          type="text"
          placeholder="Nama"
          value={name}
          onChange={(e) => setName(e.target.value)}
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

        <div className="flex gap-4">
          <label className="flex items-center">
            <input type="radio" value="L" checked={gender === 'L'} onChange={(e) => setGender(e.target.value)} />
            <span className="ml-2">Laki-Laki</span>
          </label>
          <label className="flex items-center">
            <input type="radio" value="P" checked={gender === 'P'} onChange={(e) => setGender(e.target.value)} />
            <span className="ml-2">Perempuan</span>
          </label>
        </div>

        <input
          type="text"
          placeholder="No HP"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="border p-2 w-full rounded"
          required
        />

        <input
          type="date"
          placeholder="Tanggal Lahir"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
          className="border p-2 w-full rounded"
          required
        />

        <input
          type="text"
          placeholder="Alamat"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="border p-2 w-full rounded"
          required
        />

        {/* Additional Fields for "Pekerja" */}
        {role === 'Pekerja' && (
          <>
            <select
              value={bankName}
              onChange={(e) => setBankName(e.target.value)}
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

            <input
              type="text"
              placeholder="No Rekening"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              className="border p-2 w-full rounded"
              required
            />

            <input
              type="text"
              placeholder="NPWP"
              value={npwp}
              onChange={(e) => setNpwp(e.target.value)}
              className="border p-2 w-full rounded"
              required
            />

            <input
              type="url"
              placeholder="URL Foto"
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
              className="border p-2 w-full rounded"
            />
          </>
        )}

        <button type="submit" className="bg-blue-500 text-black py-2 w-full rounded-lg">
          Register
        </button>
      </form>
    </div>
  );
}
