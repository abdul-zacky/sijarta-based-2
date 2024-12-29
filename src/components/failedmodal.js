"use client";

export default function FailedModal({ isOpen, onClose, message }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-4">GAGAL</h2>
        <p className="mb-6">{message}</p>
        <button
          className="bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-600"
          onClick={onClose}
        >
          Tutup
        </button>
      </div>
    </div>
  );
}
