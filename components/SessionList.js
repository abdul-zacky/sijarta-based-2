// src/app/components/SessionList.js
import BookingModal from './BookingModal';
import { useState } from 'react';

export default function SessionList() {
  const [showModal, setShowModal] = useState(false);

  const sessions = [
    { name: 'Sesi Layanan 1', price: 'Rp100,000' },
    { name: 'Sesi Layanan 2', price: 'Rp200,000' },
  ];

  return (
    <div>
      <h2>Pilihan Sesi Layanan</h2>
      {sessions.map((session, index) => (
        <div key={index} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', borderBottom: '1px solid #ccc' }}>
          <span>{session.name}</span>
          <span>{session.price}</span>
          <button onClick={() => setShowModal(true)}>Pesan</button>
        </div>
      ))}
      {showModal && <BookingModal onClose={() => setShowModal(false)} />}
    </div>
  );
}
