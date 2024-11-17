// src/app/view-pemesanan-jasa/page.js
"use client";

import { useEffect, useState } from 'react';

export default function ViewPemesananJasa() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(savedOrders);
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
      <div className="border p-4 rounded">
        <div className="flex justify-between items-center mb-2">
          <span>Subkategori Jasa</span>
          <span>Sesi Layanan</span>
          <span>Harga</span>
          <span>Nama Pekerja</span>
          <span>Status</span>
          <button className="bg-red-600 text-white px-2 py-1 rounded">
            Batalkan
          </button>
        </div>
        <div className="flex justify-between items-center mb-2">
          <span>Subkategori Jasa</span>
          <span>Sesi Layanan</span>
          <span>Harga</span>
          <span>Nama Pekerja</span>
          <span>Status</span>
          <button className="bg-red-600 text-white px-2 py-1 rounded">
            Buat Testimoni
          </button>
        </div>
        <div className="flex justify-between items-center mb-2">
          <span>Subkategori Jasa</span>
          <span>Sesi Layanan</span>
          <span>Harga</span>
          <span>Nama Pekerja</span>
          <span>Status</span>
          <span></span>
        </div>
        {orders.map((order, index) => (
          <div key={index} className="flex justify-between items-center border-t py-2">
            <span>{order.subkategori || "N/A"}</span>
            <span>{order.sesiLayanan || "N/A"}</span>
            <span>Rp {order.totalPembayaran.toLocaleString()}</span>
            <span>{order.namaPekerja || "TBD"}</span>
            <span>{order.status}</span>
            <span>
              {order.status === "Menunggu Pembayaran" || order.status === "Mencari Pekerja Terdekat" ? (
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
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
