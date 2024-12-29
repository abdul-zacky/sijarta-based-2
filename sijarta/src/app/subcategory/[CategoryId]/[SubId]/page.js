"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useAuth } from "/context/AuthContext";
import { useRouter } from "next/navigation";

export default function SubcategoryPage({ params }) {
  const router = useRouter();
  const { user } = useAuth();

  const [orders, setOrders] = useState([]);
  const [categoryId, setCategoryId] = useState(null);
  const [subId, setSubId] = useState(null);
  const [category, setCategory] = useState({});
  const [subcategory, setSubcategory] = useState({});
  const [sessions, setSessions] = useState([]);
  const [workers, setWorkers] = useState([]);
  const [testimonies, setTestimonies] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [profile, setProfile] = useState({
    role: "Guest",
    name: "",
  });
  const [showModal, setShowModal] = useState(false);  // For modal visibility
  const [selectedSessionPrice, setSelectedSessionPrice] = useState(null);
  const [formData, setFormData] = useState({
    tanggalPemesanan: "",
    diskon: "",
    metodePembayaran: "",
    totalPembayaran: 0,
  });

  const fetchOrders = async () => {
    try {
      const timestamp = new Date().getTime();
      const response = await fetch(`/api/orders?id=${user.id}&t=${timestamp}`);
      if (!response.ok) throw new Error("Failed to fetch orders");
      const data = await response.json();
      setOrders(data.orders || []);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  // Resolve params only once
  useEffect(() => {
    (async () => {
      const resolvedParams = await params;
      setCategoryId(resolvedParams.CategoryId);
      setSubId(resolvedParams.SubId);
    })();
  }, [params]);

  // Fetch profile once user is authenticated
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
        });
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
    fetchOrders();
  }, [user]);

  // Fetch subcategory details
  useEffect(() => {
    if (!categoryId || !subId) return;

    const fetchData = async () => {
      try {
        const response = await fetch(`/api/subcategory/${categoryId}/${subId}`);
        if (!response.ok) throw new Error("Failed to fetch subcategory");
        const data = await response.json();
        setCategory(data.kategori_jasa || {});
        setSubcategory(data.subkategori_jasa || {});
        setSessions(data.sesi_layanan || []);
        setWorkers(data.daftar_pekerja || []);
        setTestimonies(data.daftar_testimoni || []);
        setPaymentMethods(data.daftar_metode || []);
      } catch (error) {
        console.error("Error fetching subcategory data:", error);
      }
    };

    fetchData();
  }, [categoryId, subId]);

  const handlePesanClick = (price, sesi) => {
    console.log("Pesan button clicked for session with price:", price, "and sesi:", sesi);
    setFormData((prev) => ({
      ...prev,
      totalPembayaran: price,
      sesi: sesi, // Set the sesi here
    }));
    setSelectedSessionPrice(price); // Set the session price
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);  // Close the modal
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    if (!formData.tanggalPemesanan || !formData.metodePembayaran) {
      alert("Please fill out all required fields.");
      return;
    }
  
    // Prepare payload with all necessary data
    const payload = {
      tgl_pemesanan: formData.tanggalPemesanan,
      tgl_pekerjaan: null, // Add logic if this is captured elsewhere
      waktu_pekerjaan: null, // Add logic if needed
      total_biaya: selectedSessionPrice,
      id_pelanggan: user.id, // ID of the logged-in customer
      id_pekerja: null, // Add if the worker ID is selected
      id_kategori_jasa: subId,
      sesi: formData.sesi, // Map to session if available
      id_diskon: formData.diskon || null,
      id_metode_bayar: formData.metodePembayaran,
    };
  
    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
  
      if (response.ok) {
        alert("Order saved successfully!");
        setShowModal(false); // Close the modal
        await fetchOrders();
        router.push("/orders"); // Redirect to orders page
      } else {
        const errorData = await response.json();
        alert(`Failed to save order: ${errorData.error}`);
      }
    } catch (error) {
      console.error("Error saving order:", error);
      alert("An error occurred while saving the order.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-2xl font-bold mb-4" style={{ textTransform: "capitalize" }}>
          {subcategory.nama_subkategori}
        </h1>
        <h1 className="text-2xl font-bold mb-4" style={{ textTransform: "capitalize" }}>
          {category.nama_kategori}
        </h1>
      </div>
      <div className="border p-4 rounded mb-4">
        <h2 className="text-lg font-semibold mb-4">Deskripsi</h2>
        <p>{subcategory.deskripsi}</p>
      </div>

      {profile.role === "Pengguna" && (
        <div>
          <div className="border p-4 rounded mb-4">
            <h2 className="text-lg font-semibold mb-4">Pilihan Sesi Layanan</h2>
            <div className="border-t border-gray-300">
            {sessions.map((session, index) => (
                <div
                  key={`${session.id}-${index}`}
                  className={`flex justify-between items-center py-2 px-4 ${
                    index % 2 === 0 ? "bg-gray-100" : "bg-white"
                  } border-b`}
                >
                  <span className="font-medium">Sesi Layanan {session.sesi}</span>
                  <span className="font-medium">Rp {session.harga}</span>
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                    onClick={() => handlePesanClick(session.harga, session.sesi)} // Pass sesi here
                  >
                    Button Pesan
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Modal for form */}
          {showModal && (
            <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
              <div className="bg-white p-6 text-black rounded shadow-lg w-96">
                <h2 className="text-lg font-bold mb-4">Pesan Jasa</h2>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Tanggal Pemesanan:</label>
                  <input
                    type="date"
                    name="tanggalPemesanan"
                    value={formData.tanggalPemesanan}
                    onChange={handleFormChange}
                    className="w-full border px-3 py-2 rounded"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Kode Diskon:</label>
                  <input
                    type="text"
                    name="diskon"
                    value={formData.diskon}
                    onChange={handleFormChange}
                    className="w-full border px-3 py-2 rounded"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Total Pembayaran:</label>
                  <p>Rp {selectedSessionPrice}</p>
                </div>
                <div className="border p-4 rounded mb-4">
                  <h2 className="text-lg font-semibold mb-4">Metode Pembayaran</h2>
                  {paymentMethods.length === 0 ? (
                    <p className="text-red-500">No payment methods available.</p>
                  ) : (
                    <select
                      name="metodePembayaran"
                      value={formData.metodePembayaran}
                      onChange={handleFormChange}
                      className="w-full border px-3 py-2 rounded"
                    >
                      <option value="">Pilih Metode</option>
                      {paymentMethods.map((method) => (
                        <option key={method.id} value={method.id}>
                          {method.nama}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
                <div className="flex justify-end">
                  <button
                    className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-800 mr-2"
                    onClick={handleCloseModal}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-800"
                    onClick={handleSave}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          )}
          <div className="border p-4 rounded mb-4">
            <h2 className="text-lg font-semibold mb-4">Pekerja</h2>
            <div className="grid grid-cols-4 gap-4 mb-4">
              {workers.map((worker, index) => (
                <Link href={`/worker/${worker.id}`} key={worker.id}>
                    <div className="border p-2 rounded text-center bg-gray-100 shadow-sm hover:bg-gray-200 cursor-pointer">
                      <p className="font-medium">{worker.nama}</p>
                    </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Pekerja role view */}
      {profile.role === "Pekerja" && (
        <div>
          <div className="border p-4 rounded mb-4">
            <h2 className="text-lg font-semibold mb-4">Pilihan Sesi Layanan</h2>
            <div className="border-t border-gray-300">
              {sessions.map((session, index) => (
                <div key={session.id}
                  className={`flex justify-between items-center py-2 px-4 ${
                    index % 2 === 0 ? "bg-gray-100" : "bg-white"
                  } border-b`}
                >
                  <span className="font-medium">Sesi Layanan {session.sesi}</span>
                  <span className="font-medium">Rp {session.harga}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="container mx-auto p-4">
            <div className="border p-4 rounded mb-4">
              <h2 className="text-lg font-semibold mb-4">Pekerja</h2>
              <div className="grid grid-cols-4 gap-4 mb-4">
                {workers.map((worker, index) => (
                  <div
                    key={worker.id}
                    className="border p-2 rounded text-center bg-gray-100 shadow-sm"
                  >
                    <p className="font-medium">{worker.nama}</p>
                  </div>
                ))}
              </div>
              <div className="text-center">
                <button className="border px-6 py-2 rounded bg-blue-500 text-white hover:bg-blue-700">
                  Button Bergabung
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="border p-4 rounded">
        <h2 className="text-lg font-semibold mb-4">Testimoni</h2>
        <div className="border p-4 rounded mb-4">
          {testimonies.map((testimonial, index) => (
            <div
              key={index}
              className={`p-4 border rounded mb-4 ${
                index % 2 === 0 ? "bg-gray-100" : "bg-white"
              }`}
            >
              <div className="flex justify-between mb-2">
                <p className="font-medium">{testimonial.nama}</p>
                <p className="text-gray-500">{testimonial.tgl}</p>
              </div>
              <p className="mb-2">{testimonial.teks}</p>
              <div className="flex justify-between">
                <p className="font-medium">{testimonial.pekerja_nama}</p>
                <p className="font-medium">Rating: {testimonial.rating}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
