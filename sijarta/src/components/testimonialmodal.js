import { useState } from "react";

export default function TestimonialModal({ isOpen, onClose, onSubmit }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = () => {
    if (rating > 0 && comment.trim()) {
      onSubmit({ rating, comment });
      setRating(0);
      setComment("");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
        <h2 className="text-xl font-semibold mb-4">Buat Testimoni</h2>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Rating (1-10)</label>
          <input
            type="number"
            min="1"
            max="10"
            value={rating}
            onChange={(e) => setRating(parseInt(e.target.value))}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Komentar</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full p-2 border rounded"
          ></textarea>
        </div>
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
