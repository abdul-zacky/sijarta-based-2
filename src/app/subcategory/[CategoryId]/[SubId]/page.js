"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';

export default function SubcategoryPage({ params }) {
  const router = useRouter();
  const [role, setRole] = useState("Guest"); // Possible roles: 'Guest', 'Pengguna', 'Pekerja'
  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState(null);
  const [subId, setSubId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    tanggalPemesanan: "",
    diskon: "",
    metodePembayaran: "",
    totalPembayaran: 0,
  });

  useEffect(() => {
    async function resolveParams() {
      const resolvedParams = await params; 
      setCategoryId(resolvedParams?.CategoryId || "N/A");
      setSubId(resolvedParams?.SubId || "N/A");

      console.log("Resolved Params:", resolvedParams); 
    }

    resolveParams();
  }, [params]);


  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user")) || { role: "Guest" };
    setRole(userData.role);
    setName(userData.name || "Guest");
  }, []);

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0]; // Format as YYYY-MM-DD
    setFormData((prev) => ({
      ...prev,
      tanggalPemesanan: today,
    }));
  }, []);

  useEffect(() => {
    console.log("showModal state:", showModal);
  }, [showModal]);

  const handleLogout = () => {
    // Clear user session
    localStorage.removeItem("user");
    setRole("Guest");
    setName("");
  };

  const handlePesanClick = () => {
    console.log("Pesan button clicked. Current showModal:", showModal);
    setShowModal(true);
    console.log("showModal should now be true.");
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    if (!formData.tanggalPemesanan || !formData.metodePembayaran) {
      alert("Please fill out all required fields.");
      return;
    }
  
    // Retrieve existing orders or initialize an empty array
    const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];
    
    // Add categoryId and subId to formData for better context in View Pemesanan Jasa
    const newOrder = {
      ...formData,
      subkategori: `Subkategori Jasa ${subId}`,
      kategori: `Kategori Jasa ${categoryId}`,
      status: "Menunggu Pembayaran",
    };
  
    // Append the new order to the existing orders array
    const updatedOrders = [...existingOrders, newOrder];
  
    // Save the updated orders array back to localStorage
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
  
    alert("Pemesanan berhasil disimpan!");
    setShowModal(false);
    router.push("/orders");
  };
  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-2xl font-bold mb-4">Subkategori Jasa {subId}</h1>
        <h1 className="text-2xl font-bold mb-4">Kategori Jasa {categoryId}</h1>
      </div>
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
                    <p>Rp.xxx.xxx,xx</p>
                    {/* <input
                    type="number"
                    name="totalPembayaran"
                    value={formData.totalPembayaran}
                    onChange={handleFormChange}
                    className="w-full border px-3 py-2 rounded"
                    /> */}
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Metode Pembayaran:</label>
                    <select
                    name="metodePembayaran"
                    value={formData.metodePembayaran}
                    onChange={handleFormChange}
                    className="w-full border px-3 py-2 rounded"
                    >
                    <option value="">Pilih Metode</option>
                    <option value="Transfer Bank">Transfer Bank</option>
                    <option value="E-Wallet">E-Wallet</option>
                    </select>
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

      {/* Guest Role */}
      {role === "Guest" && (
        <div className="text-center">
          <h2 className="text-lg font-semibold mb-2">Harap Login terlebih dahulu untuk melihat detail Subkategori Jasa</h2>
          <div className="flex justify-center gap-4">
            <Link href="/login" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-800">
              Login
            </Link>
            <Link href="/register" className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-800">
              Register
            </Link>
          </div>
        </div>
      )}

      {/* Pengguna Role */}
      {role === "Pengguna" && (
        <div>
          <div className="border p-4 rounded mb-4">
            <h2 className="text-lg font-semibold mb-4">Deskripsi</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent cursus rhoncus magna nec congue. Proin purus arcu, mattis ut porttitor sed, mattis a enim. Mauris imperdiet rutrum rutrum. Suspendisse pellentesque ex orci, ut ultricies lectus porttitor scelerisque. Phasellus eget porta justo. </p>
          </div>
          <br></br>
          <div className="border p-4 rounded mb-4">
            <h3 className="font-bold mb-2">Pilihan Sesi Layanan</h3>
            <div className="flex justify-between items-center mb-2">
              <span>Sesi Layanan 1</span>
              <span>Rp 100,000</span>
              <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-800" onClick={handlePesanClick}>
                Pesan
              </button>
            </div>
            <div className="flex justify-between items-center">
              <span>Sesi Layanan 2</span>
              <span>Rp 200,000</span>
              <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-800" onClick={handlePesanClick}>
                Pesan
              </button>
            </div>
          </div>
          <br></br>
          <div className="border p-4 rounded mb-4">
            <h3 className="font-bold mb-2">Pekerja</h3>
            <div className="flex justify-between items-center mb-2">
              <div className="border p-4 rounded mb-4">Nama Pekerja 1</div>
              <div className="border p-4 rounded mb-4">Nama Pekerja 2</div>
              <div className="border p-4 rounded mb-4">Nama Pekerja 3</div>
              <div className="border p-4 rounded mb-4">Nama Pekerja 4</div>
            </div>
          </div>
          <br></br>
          <div className="border p-4 rounded mb-4">
            <h3 className="font-bold mb-2">Testimoni</h3>
            <div className="border p-4 rounded mb-4">
              <div className="flex justify-between items-center mb-2">
                <div>{name}</div>
                <div>
                  <p>Tanggal</p>
                </div>
              </div>
              <br></br>
              <div className="flex justify-between items-center mb-2">
                <div className="mb-4">
                  <p>Teks Testimoni :</p>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent cursus rhoncus magna nec congue.</p>
                </div>
                <div className="mb-4">
                  <p>Nama Pekerja</p>
                  <p>Rating</p>
                </div>
              </div>
            </div>
          </div>
          <button
            className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-800"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      )}

      {/* Pekerja Role */}
      {role === "Pekerja" && (
        <div>
        <div className="border p-4 rounded mb-4">
          <h2 className="text-lg font-semibold mb-4">Deskripsi</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent cursus rhoncus magna nec congue. Proin purus arcu, mattis ut porttitor sed, mattis a enim. Mauris imperdiet rutrum rutrum. Suspendisse pellentesque ex orci, ut ultricies lectus porttitor scelerisque. Phasellus eget porta justo. </p>
        </div>
        <br></br>
        <div className="border p-4 rounded mb-4">
          <h3 className="font-bold mb-2">Pilihan Sesi Layanan</h3>
          <div className="flex justify-between items-center mb-2">
            <span>Sesi Layanan 1</span>
            <span>Rp 100,000</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Sesi Layanan 2</span>
            <span>Rp 200,000</span>
          </div>
        </div>
        <br></br>
        <div className="border p-4 rounded mb-4">
          <h3 className="font-bold mb-2">Pekerja</h3>
          <div className="flex justify-between items-center mb-2">
            <div className="border p-4 rounded mb-4">Nama Pekerja 1</div>
            <div className="border p-4 rounded mb-4">Nama Pekerja 2</div>
            <div className="border p-4 rounded mb-4">Nama Pekerja 3</div>
            <div className="border p-4 rounded mb-4">Nama Pekerja 4</div>
          </div>
        </div>
        <br></br>
        <div className="border p-4 rounded mb-4">
          <div className="flex justify-center items-center mb-2">
          <Link href="/profile" className="text-gray-300 hover:text-white">
            Button Bergabung
          </Link>
            
          </div>
        </div>
        <br></br>
        <div className="border p-4 rounded mb-4">
          <h3 className="font-bold mb-2">Testimoni</h3>
          <div className="border p-4 rounded mb-4">
            <div className="flex justify-between items-center mb-2">
              <div>{name}</div>
              <div>
                <p>Tanggal</p>
              </div>
            </div>
            <br></br>
            <div className="flex justify-between items-center mb-2">
              <div className="mb-4">
                <p>Teks Testimoni :</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent cursus rhoncus magna nec congue.</p>
              </div>
              <div className="mb-4">
                <p>Nama Pekerja</p>
                <p>Rating</p>
              </div>
            </div>
          </div>
        </div>
        <Link href="/login" className="text-gray-300 hover:text-white">
        <button
          className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-800"
          onClick={handleLogout}
        >
          Logout
        </button>
        </Link>
        
      </div>
    )}
    
    </div>
  );
}

