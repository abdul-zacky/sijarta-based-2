"use client";

import VoucherList from '../../components/voucherlist';
import PromoList from '../../components/promolist';

export default function DiskonPage() {
  return (
    <div className="grid grid-row items-center min-h-screen text-black bg-gray-100 py-12 px-6">
      <h1 className="text-5xl font-bold text-center mb-8 tracking-wide">Diskon</h1>

      <div className="flex flex-col items-center w-full">
        <div className="w-full max-w-4xl bg-white p-8 rounded-xl shadow-lg mb-10">
            <h2 className="text-2xl font-semibold mb-6">Voucher</h2>
            <VoucherList />
        </div>

        <div className="w-full max-w-4xl bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-2xl font-semibold mb-6">Promo</h2>
            <PromoList />
        </div>
      </div>
    </div>
  );
}
