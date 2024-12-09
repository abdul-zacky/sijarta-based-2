"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "/context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <nav className="w-full bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-white font-bold text-xl">
          Sijarta by BASED
        </Link>
        <div className="space-x-4 flex items-center">
          {(!user || !user.role) ? (
            <>
              <Link href="/login" className="text-gray-300 hover:text-white">
                Login
              </Link>
              <Link href="/register" className="text-gray-300 hover:text-white">
                Register
              </Link>
            </>
          ) : (
            <>
              <span className="text-gray-300">{`Role: ${user.role} | ${user.name}`}</span>
              {user.role === "Pelanggan" && (
                <>
                  <Link href="/services" className="text-gray-300 hover:text-white">
                    Homepage
                  </Link>
                  <Link href="/orders" className="text-gray-300 hover:text-white">
                    Kelola Pesanan Saya
                  </Link>
                  <Link href="/discounts" className="text-gray-300 hover:text-white">
                    Diskon
                  </Link>
                </>
              )}
              {user.role === "Pekerja" && (
                <>
                  <Link href="/services" className="text-gray-300 hover:text-white">
                    Homepage
                  </Link>
                  <Link href="/work-management" className="text-gray-300 hover:text-white">
                    Kelola Pekerjaan Saya
                  </Link>
                  <Link href="/work-status" className="text-gray-300 hover:text-white">
                    Kelola Status Pekerjaan
                  </Link>
                </>
              )}
              <Link href="/profile" className="text-gray-300 hover:text-white">
                Profile
              </Link>
              <Link href="/mypay" className="text-gray-300 hover:text-white">
                MyPay
              </Link>
              <button
                onClick={handleLogout}
                className="text-gray-300 hover:text-white"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default navbar;
