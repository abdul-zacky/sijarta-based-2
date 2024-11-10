// src/app/profile/page.js
"use client";

import { useState, useEffect } from 'react';

export default function Profile() {
  const [user, setUser] = useState({ role: 'Guest', name: '' });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user')) || { role: 'Guest' };
    setUser(storedUser);
  }, []);

  const handleUpdate = (e) => {
    e.preventDefault();
    alert('Profile updated');
  };

  return (
    <div>
      <h1>Profile</h1>
      {user.role === 'Guest' ? (
        <p>Please log in to view your profile.</p>
      ) : (
        <form onSubmit={handleUpdate}>
          <p>Role: {user.role}</p>
          <p>Name: {user.name}</p>
          <input type="text" placeholder="No HP" defaultValue={user.phone} required />
          <input type="text" placeholder="Alamat" defaultValue={user.address} />
          {user.role === 'Pekerja' && (
            <>
              <input type="text" placeholder="Nama Bank" defaultValue={user.bankName} />
              <input type="text" placeholder="No Rekening" defaultValue={user.accountNumber} />
              <input type="text" placeholder="NPWP" defaultValue={user.npwp} />
            </>
          )}
          <button type="submit">Update Profile</button>
        </form>
      )}
    </div>
  );
}
