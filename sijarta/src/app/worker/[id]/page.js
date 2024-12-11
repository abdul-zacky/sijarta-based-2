// "use client";

// import Link from "next/link";
// import { useState, useEffect } from "react";
// import { useAuth } from "/context/AuthContext";
// import { useRouter } from "next/navigation";

// export default function WorkerProfile({ params }) {
//   const router = useRouter();
//   const [worker, setWorker] = useState({});
//   const { user } = useAuth();
//   const [profileId, setId] = useState(null);
//   const [profile, setProfile] = useState({
//     role: "Guest",
//     name: "",
//   });

//   useEffect(() => {
//     (async () => {
//       const resolvedParams = await params;
//       setId(resolvedParams.id);
//       console.log("Found :", profileId)
//     })();
//   }, [params]);

//   useEffect(() => {
//     if (!user) {
//       router.push("/login");
//       return;
//     }

//     const fetchProfile = async () => {
//       try {
//         const res = await fetch(`/api/profile?id=${user.id}`);
//         if (!res.ok) throw new Error("Failed to fetch profile");
//         const data = await res.json();
//         setProfile({
//           role: data.role || "Pengguna",
//           name: data.name || "Guest",
//         });
//       } catch (error) {
//         console.error("Error fetching profile:", error);
//       }
//     };

//     fetchProfile();
//   }, [user]);

//   useEffect(() => {
//     const fetchWorkerData = async () => {
//       try {
//         const res = await fetch(`/api/worker/${profileId}`);
//         if (res.ok) {
//           const data = await res.json();
//           setWorker(data.worker);
//           console.log("Worker :", worker.id)
//         } else {
//           console.error("Failed to fetch worker data");
//         }
//       } catch (error) {
//         console.error("Error fetching worker:", error);
//       }
//     };

//     fetchWorkerData();
//   }, [profileId]);

//   if (!worker) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">{worker.nama}</h1>
//       <div className="border p-4 rounded mb-4">
//         <h2 className="text-lg font-semibold mb-4">Profile</h2>
//         <p><strong>Nama:</strong> {worker.nama}</p>
//         <p><strong>Deskripsi:</strong> {worker.deskripsi}</p>
//         <p><strong>Rating:</strong> {worker.rating}</p>
//       </div>
//     </div>
//   );
// }

"use client";

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
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">{worker.nama}</h1>
      <p><strong>Rating:</strong> {worker.rating}</p>
      <p><strong>Orders Completed:</strong> {worker.jml_pesanan_selesai}</p>
      <p><strong>Address:</strong> {worker.alamat}</p>
      <img src={worker.link_foto} alt={worker.nama} className="w-32 h-32 rounded-full" />
    </div>
  );
}
