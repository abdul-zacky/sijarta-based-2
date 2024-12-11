// "use client";

// import { useEffect, useState } from "react";
// import TestimonialModal from "../../components/testimonialmodal";

// export default function ViewPemesananJasa() {
//   const [orders, setOrders] = useState([]);
//   const [isTestimonialModalOpen, setIsTestimonialModalOpen] = useState(false);
//   const [selectedOrderIndex, setSelectedOrderIndex] = useState(null);
//   const [testimonials, setTestimonials] = useState([]);
//   const [filteredOrders, setFilteredOrders] = useState([]);
//   const [filters, setFilters] = useState({
//     subkategori: "",
//     status: "",
//     search: "",
//   });

//   useEffect(() => {
//     applyFilters(filters);
//   }, [orders]);

//   // Dummy data for testing
//   useEffect(() => {
//     const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
//     const savedTestimonials = JSON.parse(localStorage.getItem("testimonials")) || [];
//     setTestimonials(savedTestimonials);
    
//     const dummyData = [
//       {
//         subkategori: "Subkategori Jasa 1",
//         sesiLayanan: "N/A",
//         totalPembayaran: 0,
//         namaPekerja: "TBD",
//         status: "Dibatalkan",
//       },
//       {
//         subkategori: "Subkategori Jasa 2",
//         sesiLayanan: "Sesi Layanan 1",
//         totalPembayaran: 100000,
//         namaPekerja: "John Doe",
//         status: "Menunggu Pembayaran",
//       },
//       {
//         subkategori: "Subkategori Jasa 3",
//         sesiLayanan: "Sesi Layanan 2",
//         totalPembayaran: 200000,
//         namaPekerja: "Jane Doe",
//         status: "Pesanan Selesai",
//       },
//     ];

//     // Check if any of the dummy data already exists in savedOrders
//     const hasDummyData = dummyData.every((dummy) =>
//       savedOrders.some(
//         (order) =>
//           order.subkategori === dummy.subkategori &&
//           order.sesiLayanan === dummy.sesiLayanan &&
//           order.totalPembayaran === dummy.totalPembayaran &&
//           order.namaPekerja === dummy.namaPekerja &&
//           order.status === dummy.status
//       )
//     );

//     if (!hasDummyData) {
//       const updatedOrders = [...savedOrders, ...dummyData];
//       localStorage.setItem("orders", JSON.stringify(updatedOrders));
//       setOrders(updatedOrders);
//       setFilteredOrders(updatedOrders); // Initialize filteredOrders
//     } else {
//       setOrders(savedOrders);
//       setFilteredOrders(savedOrders); // Initialize filteredOrders
//     }
//   }, []);

//   const handleFilterChange = (key) => (e) => {
//     const value = e.target.value;
//     const newFilters = { ...filters, [key]: value };
//     setFilters(newFilters);
//     applyFilters(newFilters);
//   };

//   const applyFilters = (currentFilters) => {
//     let result = [...orders];
//     if (currentFilters.subkategori) {
//       result = result.filter((order) =>
//         order.subkategori.includes(currentFilters.subkategori)
//       );
//     }
//     if (currentFilters.status) {
//       result = result.filter((order) => order.status === currentFilters.status);
//     }
//     if (currentFilters.search) {
//       result = result.filter((order) =>
//         order.namaPekerja.toLowerCase().includes(currentFilters.search.toLowerCase())
//       );
//     }
//     setFilteredOrders(result);
//   };

//   const handleCancel = (index) => {
//     const updatedOrders = orders.map((order, i) => {
//       if (i === index) {
//         return { ...order, status: "Dibatalkan" };
//       }
//       return order;
//     });
//     setOrders(updatedOrders);
//     localStorage.setItem("orders", JSON.stringify(updatedOrders));
//     applyFilters(filters); // Reapply filters after cancellation
//   };

//   const handleAddTestimonial = (testimonial) => {
//     const updatedTestimonials = [...testimonials, { ...testimonial, orderIndex: selectedOrderIndex }];
//     setTestimonials(updatedTestimonials);
//     localStorage.setItem("testimonials", JSON.stringify(updatedTestimonials)); // Save to localStorage
//     setIsTestimonialModalOpen(false);
//   };

//   const handleTestimoni = (index) => {
//     setSelectedOrderIndex(index);
//     setIsTestimonialModalOpen(true);
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">View Pemesanan Jasa</h1>
//       <div className="flex flex-wrap gap-4 mb-4">
//         <select
//           value={filters.subkategori}
//           onChange={handleFilterChange("subkategori")}
//           className="border p-2 rounded w-full md:w-1/3"
//         >
//           <option value="">Pilih Subkategori</option>
//           <option value="Subkategori Jasa 1">Subkategori Jasa 1</option>
//           <option value="Subkategori Jasa 2">Subkategori Jasa 2</option>
//           <option value="Subkategori Jasa 3">Subkategori Jasa 3</option>
//         </select>

//         <select
//           value={filters.status}
//           onChange={handleFilterChange("status")}
//           className="border p-2 rounded w-full md:w-1/3"
//         >
//           <option value="">Pilih Status</option>
//           <option value="Dibatalkan">Dibatalkan</option>
//           <option value="Menunggu Pembayaran">Menunggu Pembayaran</option>
//           <option value="Pesanan Selesai">Pesanan Selesai</option>
//         </select>

//         <input
//           type="text"
//           placeholder="Search"
//           value={filters.search}
//           onChange={handleFilterChange("search")}
//           className="border p-2 rounded w-full md:w-1/3"
//         />
//         <button
//           onClick={() => {
//             setFilters({ subkategori: "", status: "", search: "" });
//             setFilteredOrders(orders); // Reset to the original order list
//           }}
//           className="bg-gray-500 text-white px-4 py-2 rounded"
//         >
//           Reset Filters
//         </button>
//       </div>
//       <table className="table-auto border-collapse border border-gray-400 w-full text-center">
//         <thead className="bg-gray-200 text-black">
//           <tr>
//             <th className="border border-gray-400 px-4 py-2">Subkategori Jasa</th>
//             <th className="border border-gray-400 px-4 py-2">Sesi Layanan</th>
//             <th className="border border-gray-400 px-4 py-2">Harga</th>
//             <th className="border border-gray-400 px-4 py-2">Nama Pekerja</th>
//             <th className="border border-gray-400 px-4 py-2">Status</th>
//             <th className="border border-gray-400 px-4 py-2">Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredOrders.map((order, index) => (
//             <tr key={index}>
//               <td className="border border-gray-400 px-4 py-2">
//                 {order.subkategori || "N/A"}
//               </td>
//               <td className="border border-gray-400 px-4 py-2">
//                 {order.sesiLayanan || "N/A"}
//               </td>
//               <td className="border border-gray-400 px-4 py-2">
//                 Rp {order.totalPembayaran.toLocaleString()}
//               </td>
//               <td className="border border-gray-400 px-4 py-2">
//                 {order.namaPekerja || "TBD"}
//               </td>
//               <td className="border border-gray-400 px-4 py-2">
//                 {order.status}
//               </td>
//               <td className="border border-gray-400 px-4 py-2">
//                 {order.status === "Menunggu Pembayaran" ||
//                 order.status === "Mencari Pekerja Terdekat" ? (
//                   <button
//                     onClick={() => handleCancel(index)}
//                     className="bg-red-600 text-white px-2 py-1 rounded"
//                   >
//                     Batalkan
//                   </button>
//                 ) : order.status === "Pesanan Selesai" ? (
//                   <button
//                     onClick={() => handleTestimoni(index)}
//                     className="bg-green-600 text-white px-2 py-1 rounded"
//                   >
//                     Buat Testimoni
//                   </button>
//                 ) : (
//                   "-"
//                 )}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       <TestimonialModal
//         isOpen={isTestimonialModalOpen}
//         onClose={() => setIsTestimonialModalOpen(false)}
//         onSubmit={handleAddTestimonial}
//       />

//       <div className="mt-8">
//         <h2 className="text-2xl font-bold mb-6">Daftar Testimoni</h2>
//         {testimonials.length > 0 ? (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {testimonials.map((testimonial, index) => (
//               <div
//                 key={index}
//                 className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-300"
//               >
//                 <h3 className="text-lg font-semibold text-blue-500 mb-2">
//                   {orders[testimonial.orderIndex]?.subkategori}
//                 </h3>

//                 <div className="flex items-center mb-4">
//                   {Array.from({ length: testimonial.rating }).map((_, starIndex) => (
//                     <span key={starIndex} className="text-yellow-500 text-lg">★</span>
//                   ))}
//                   {Array.from({ length: 10 - testimonial.rating }).map((_, starIndex) => (
//                     <span key={starIndex} className="text-gray-300 text-lg">★</span>
//                   ))}
//                   <span className="ml-2 text-gray-600">({testimonial.rating}/10)</span>
//                 </div>

//                 <p className="text-gray-700 mb-4">{testimonial.comment}</p>

//                 <div className="text-sm text-gray-500">
//                   <p><strong>Nama Pekerja:</strong> {orders[testimonial.orderIndex]?.namaPekerja}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <p className="text-center text-gray-500">Belum ada testimoni.</p>
//         )}
//       </div>
//     </div>
//   );
// }\

"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useAuth } from "/context/AuthContext";
import { useRouter } from "next/navigation";

export default function ViewOrdersPage() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [profile, setProfile] = useState({
    id: null,
    role: "Guest",
    name: "",
  });
  const router = useRouter();

  // Fetch profile first
  useEffect(() => {
    if (!user) {
      router.push("/login");
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await fetch(`/api/profile?id=${user.id}`);
        if (!res.ok) throw new Error("Failed to fetch profile");
        const data = await res.json();
        setProfile({
          role: data.role || "Pengguna",
          name: data.name || "Guest",
          id: data.id || null,
        });
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, [user]);

  // Fetch orders only if profile.id is available
  useEffect(() => {
    if (profile.id) {
      const fetchOrders = async () => {
        try {
          const res = await fetch(`/api/orders?id=${profile.id}`);
          if (res.ok) {
            const data = await res.json();
            if (data.orders) {
              setOrders(data.orders);
            } 
          } else {
            console.error("Failed to fetch orders. Status:", res.status);
          }
        } catch (error) {
          console.error("Error fetching orders:", error);
        }
      };
  
      fetchOrders();
    }
  }, [profile.id]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">View Pemesanan Jasa</h1>
      <table className="min-w-full table-auto">
        <thead>
          <tr>
            <th className="border px-4 py-2">Subkategori Jasa</th>
            <th className="border px-4 py-2">Sesi Layanan</th>
            <th className="border px-4 py-2">Harga</th>
            <th className="border px-4 py-2">Nama Pekerja</th>
            <th className="border px-4 py-2">Status</th>
            <th className="border px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 ? (
            orders.map((order) => (
              <tr key={`${order.id}-${order.status}`}>
                <td className="border px-4 py-2 text-center">{order.id}</td>
                <td className="border px-4 py-2 text-center">{order.sesi}</td>
                <td className="border px-4 py-2 text-center">{order.total_biaya}</td>
                <td className="border px-4 py-2 text-center">{order.pekerja_nama}</td>
                <td className="border px-4 py-2 text-center">{order.status}</td>
                <td className="border px-4 py-2 text-center">
                  {order.status == "Order Canceled" || order.status == "Service Completed" && (
                    <button className="bg-green-500 text-white px-4 py-2 rounded">
                      Buat Testimoni
                    </button>
                  )}
                  {order.status != "Order Canceled" && order.status != "Service Completed" && (
                    <button className="bg-red-500 text-white px-4 py-2 rounded">
                      Batalkan
                    </button>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="border px-4 py-2 text-center">
                No orders found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <h2 className="text-xl font-semibold mt-4">Daftar Testimoni</h2>
      {/* Here you can map through and display the testimoni */}
    </div>
  );
}
