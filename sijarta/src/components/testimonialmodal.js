"use client";

import { useState } from 'react';

export default function TestimonialModal({ isOpen, onClose, onSubmit }) {
  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');

  const handleSubmit = () => {
    if (!rating || !comment) {
      alert('Mohon isi semua kolom.');
      return;
    }

    onSubmit({ rating, comment });

    setRating('');
    setComment('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 px-4">
      <div className="bg-white p-6 text-black rounded-lg shadow-lg w-full max-w-lg relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-800 font-bold text-xl"
        >
          ✖
        </button>

        <h2 className="text-2xl font-bold mb-6 text-center">Form Testimoni</h2>

        <label className="block mb-3">Rating:</label>
        <select
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          className="w-full p-2 border rounded mb-4 focus:outline-none focus:ring focus:ring-blue-300"
        >
          <option value="">Pilih rating (1-10)</option>
          {[...Array(10)].map((_, index) => (
            <option key={index + 1} value={index + 1}>{index + 1}</option>
          ))}
        </select>

        <label className="block mb-3">Komentar:</label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full p-3 border rounded mb-6 focus:outline-none focus:ring focus:ring-blue-300"
          rows="4"
          placeholder="Masukkan komentar Anda"
        />

        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white py-3 px-6 rounded hover:bg-blue-600 w-full transition-colors duration-300"
        >
          Submit
        </button>
      </div>
    </div>
  );
}
