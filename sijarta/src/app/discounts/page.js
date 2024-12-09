"use client";

import { useState, useEffect } from "react";
import VoucherList from "../../components/voucherlist";
import PromoList from "../../components/promolist";

export default function DiskonPage() {
  const [vouchers, setVouchers] = useState([]);
  const [promos, setPromos] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchVouchers = async () => {
      try {
        const response = await fetch('/api/voucher', {
          method: 'GET',  
        });
        
        if (response.ok) {
          const data = await response.json();
          setVouchers(data.vouchers);
        } else {
          const errorData = await response.json();
          setError(errorData.error || "Failed to fetch vouchers");
          console.error('Error fetching vouchers:', response.status, response.statusText, errorData);
        }
      } catch (error) {
        setError("Failed to fetch vouchers");
        console.error('Error fetching vouchers:', error);
      }
    };

    const fetchPromos = async () => {
      try {
        const response = await fetch('/api/promo', {
          method: 'GET', 
        });

        if (response.ok) {
          const data = await response.json();
          setPromos(data.promos);
        } else {
          const errorData = await response.json();
          setError(errorData.error || "Failed to fetch promos");
          console.error('Error fetching promos:', response.status, response.statusText, errorData);
        }
      } catch (error) {
        setError("Failed to fetch promos");
        console.error('Error fetching promos:', error);
      }
    };

    fetchVouchers();
    fetchPromos();
  }, []);

  return (
    <div className="grid grid-row items-center min-h-screen text-black bg-gray-100 py-12 px-6">
      <h1 className="text-5xl font-bold text-center mb-8 tracking-wide">Diskon</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="flex flex-col items-center w-full">
        <div className="w-full max-w-4xl bg-white p-8 rounded-xl shadow-lg mb-10">
          <h2 className="text-2xl font-semibold mb-6">Voucher</h2>
          <VoucherList vouchers={vouchers} />
        </div>

        <div className="w-full max-w-4xl bg-white p-8 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-6">Promo</h2>
          <PromoList promos={promos} />
        </div>
      </div>
    </div>
  );
}
