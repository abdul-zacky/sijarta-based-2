"use client";

import { useEffect, useState } from "react";

export default function ViewPemesananJasa() {
  const [orders, setOrders] = useState([]);

  // Dummy data for testing
  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    
    const dummyData = [
      {
        subkategori: "Subkategori Jasa 1",
        sesiLayanan: "N/A",
        totalPembayaran: 0,
        namaPekerja: "TBD",
        status: "Dibatalkan",
      },
      {
        subkategori: "Subkategori Jasa 2",
        sesiLayanan: "Sesi Layanan 1",
        totalPembayaran: 100000,
        namaPekerja: "John Doe",
        status: "Menunggu Pembayaran",
      },
      {
        subkategori: "Subkategori Jasa 3",
        sesiLayanan: "Sesi Layanan 2",
        totalPembayaran: 200000,
        namaPekerja: "Jane Doe",
        status: "Pesanan Selesai",
      },
    ];

    // Check if any of the dummy data already exists in savedOrders
    const hasDummyData = dummyData.every((dummy) =>
      savedOrders.some(
        (order) =>
          order.subkategori === dummy.subkategori &&
          order.sesiLayanan === dummy.sesiLayanan &&
          order.totalPembayaran === dummy.totalPembayaran &&
          order.namaPekerja === dummy.namaPekerja &&
          order.status === dummy.status
      )
    );

    if (!hasDummyData) {
      // If dummy data is not already included, add it to savedOrders
      const updatedOrders = [...savedOrders, ...dummyData];
      localStorage.setItem("orders", JSON.stringify(updatedOrders));
      setOrders(updatedOrders);
    } else {
      // Otherwise, just set the existing savedOrders
      setOrders(savedOrders);
    }
    }, []);

  const handleCancel = (index) => {
    const updatedOrders = orders.map((order, i) => {
      if (i === index) {
        return { ...order, status: "Dibatalkan" };
      }
      return order;
    });
    setOrders(updatedOrders);
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
  };

  const handleTestimoni = (index) => {
    alert("Redirect to Testimoni Form");
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">View Pemesanan Jasa</h1>
      <table className="table-auto border-collapse border border-gray-400 w-full text-center">
        <thead className="bg-gray-200 text-black">
          <tr>
            <th className="border border-gray-400 px-4 py-2">Subkategori Jasa</th>
            <th className="border border-gray-400 px-4 py-2">Sesi Layanan</th>
            <th className="border border-gray-400 px-4 py-2">Harga</th>
            <th className="border border-gray-400 px-4 py-2">Nama Pekerja</th>
            <th className="border border-gray-400 px-4 py-2">Status</th>
            <th className="border border-gray-400 px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={index}>
              <td className="border border-gray-400 px-4 py-2">
                {order.subkategori || "N/A"}
              </td>
              <td className="border border-gray-400 px-4 py-2">
                {order.sesiLayanan || "N/A"}
              </td>
              <td className="border border-gray-400 px-4 py-2">
                Rp {order.totalPembayaran.toLocaleString()}
              </td>
              <td className="border border-gray-400 px-4 py-2">
                {order.namaPekerja || "TBD"}
              </td>
              <td className="border border-gray-400 px-4 py-2">
                {order.status}
              </td>
              <td className="border border-gray-400 px-4 py-2">
                {order.status === "Menunggu Pembayaran" ||
                order.status === "Mencari Pekerja Terdekat" ? (
                  <button
                    onClick={() => handleCancel(index)}
                    className="bg-red-600 text-white px-2 py-1 rounded"
                  >
                    Batalkan
                  </button>
                ) : order.status === "Pesanan Selesai" ? (
                  <button
                    onClick={() => handleTestimoni(index)}
                    className="bg-green-600 text-white px-2 py-1 rounded"
                  >
                    Buat Testimoni
                  </button>
                ) : (
                  "-"
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
