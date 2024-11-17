// src/app/components/BookingModal.js
export default function BookingModal({ onClose }) {
    return (
      <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '20px', border: '1px solid #ccc', zIndex: 1000 }}>
        <h3>Pesan Jasa</h3>
        <form>
          <label>Nama: <input type="text" /></label><br />
          <label>Email: <input type="email" /></label><br />
          <label>No. Telepon: <input type="tel" /></label><br />
          <button type="submit">Submit</button>
        </form>
        <button onClick={onClose} style={{ marginTop: '10px' }}>Close</button>
      </div>
    );
  }
  