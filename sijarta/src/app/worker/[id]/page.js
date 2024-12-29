"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function WorkerProfile({params}) {
  const router = useRouter();
  const [ id, setId ] = useState(null);
  const [worker, setWorker] = useState({});

  useEffect(() => {
    (async () => {
      const resolvedParams = await params;
      setId(resolvedParams.id);
    })();
  }, [params]);

  useEffect(() => {
    if (!id) return; // Wait until `id` is available
    const fetchWorkerData = async () => {
      try {
        console.log("Fetching worker with ID:", id);
        const res = await fetch(`/api/worker/${id}`);
        if (res.ok) {
          const data = await res.json();
          setWorker(data.worker); // Set the worker data
        } else {
          console.error("Failed to fetch worker data.");
        }
      } catch (error) {
        console.error("Error fetching worker:", error);
      }
    };

    fetchWorkerData();
  }, [id]);

  if (!worker) return <div>Loading...</div>;

  return (
<div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-sm w-full">
        <div className="flex flex-col items-center">
          {worker.link_foto && (
            <img
              src={worker.link_foto}
              alt={worker.nama}
              className="w-32 h-32 rounded-full mb-4"
            />
          )}
          <h1 className="text-2xl font-bold mb-2 text-gray-800">{worker.nama}</h1>
          <p className="text-lg text-gray-600 mb-1">
            <strong>Rating:</strong> {worker.rating}
          </p>
          <p className="text-lg text-gray-600 mb-1">
            <strong>Orders Completed:</strong> {worker.jml_pesanan_selesai}
          </p>
          <p className="text-lg text-gray-600 mb-6">
            <strong>Address:</strong> {worker.alamat}
          </p>
          <Link href={`/services/`} className="block">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Return to Home
          </button>
          </Link>
          
        </div>
      </div>
    </div>
  );
}
