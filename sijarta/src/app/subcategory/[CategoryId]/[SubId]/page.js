"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useAuth } from "/context/AuthContext";
import { useRouter } from "next/navigation";

export default function SubcategoryPage({ params }) {
  const router = useRouter();
  const { user } = useAuth();

  const [categoryId, setCategoryId] = useState(null);
  const [subId, setSubId] = useState(null);
  const [category, setCategory] = useState({});
  const [subcategory, setSubcategory] = useState({});
  const [sessions, setSessions] = useState([]);
  const [workers, setWorkers] = useState([]);
  const [profile, setProfile] = useState({
    role: "Guest",
    name: "",
  });

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
  }, [user]);

  // Fetch subcategory details
  useEffect(() => {
    if (!categoryId || !subId) return;

    const fetchData = async () => {
      try {
        console.log(`Fetching subcategory: ${categoryId}, ${subId}`);
        const response = await fetch(`/api/subcategory/${categoryId}/${subId}`);
        if (!response.ok) throw new Error("Failed to fetch subcategory");
        const data = await response.json();
        setCategory(data.kategori_jasa || {});
        setSubcategory(data.subkategori_jasa || {});
        setSessions(data.sesi_layanan || []);
        setWorkers(data.daftar_pekerja || []);
      } catch (error) {
        console.error("Error fetching subcategory data:", error);
      }
    };

    fetchData();
  }, [categoryId, subId]);

  return (
    <div className="container mx-auto p-4">
      {/* <h2 className="text-lg font-semibold">
        Welcome, {profile.name}! You are logged in as {profile.role}.
      </h2> */}
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-2xl font-bold mb-4" style={{ textTransform: "capitalize" }}>{subcategory.nama_subkategori}</h1>
        <h1 className="text-2xl font-bold mb-4" style={{ textTransform: "capitalize" }}>{category.nama_kategori}</h1>
      </div>
      <div className="border p-4 rounded mb-4">
        <h2 className="text-lg font-semibold mb-4">Deskripsi</h2>
        <p>{subcategory.deskripsi}</p>
      </div>
      <div className="border p-4 rounded mb-4">
        <h2 className="text-lg font-semibold mb-4">Pilihan Sesi Layanan</h2>
        <div className="border-t border-gray-300">
          {sessions.map((session, index) => (
            <div
              key={session.id}
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
    </div>
  );
}
