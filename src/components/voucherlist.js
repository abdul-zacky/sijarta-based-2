"use client";

import { useState } from 'react';
import SuccessModal from './successmodal';
import FailedModal from './failedmodal';

const vouchers = [
  { kode: 'VCR10', potongan: '10%', minTransaksi: 'Rp100,000', berlaku: '7 Hari', kuota: 5, harga: 5000 },
  { kode: 'VCR20', potongan: '20%', minTransaksi: 'Rp200,000', berlaku: '10 Hari', kuota: 3, harga: 10000 },
];

export default function VoucherList() {
  const [userBalance, setUserBalance] = useState(8000);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isFailedModalOpen, setIsFailedModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const handleBuyVoucher = (voucher) => {
    if (userBalance >= voucher.harga) {
      // Jika cukup, kurangi saldo dan tampilkan pesan sukses
      setUserBalance(userBalance - voucher.harga);
      setModalMessage(
        `Selamat! Anda berhasil membeli voucher kode ${voucher.kode}. Voucher ini berlaku hingga ${voucher.berlaku} dengan kuota penggunaan sebanyak ${voucher.kuota} kali.`
      );
      setIsSuccessModalOpen(true);
    } else {
      // Jika tidak cukup, tampilkan pesan gagal
      setModalMessage('Maaf, saldo Anda tidak cukup untuk membeli voucher ini.');
      setIsFailedModalOpen(true);
    }
  };

  return (
    <>
    <div className="space-y-4">
      {vouchers.map((voucher, index) => (
        <div
          key={index}
          className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr_1fr_1fr_1fr_auto] gap-4 items-center bg-gray-50 p-4 rounded-lg shadow-md"
        >
          <p className="text-center">{voucher.kode}</p>
          <p className="text-center">{voucher.potongan}</p>
          <p className="text-center">{voucher.minTransaksi}</p>
          <p className="text-center">{voucher.berlaku}</p>
          <p className="text-center">{voucher.kuota}</p>
          <p className="text-center">{voucher.harga}</p>
            <button
              className="bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-600"
              onClick={() => handleBuyVoucher(voucher)}
            >
              Beli
            </button>
          </div>
        ))}
      </div>

      <SuccessModal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        message={modalMessage}
      />

      <FailedModal
        isOpen={isFailedModalOpen}
        onClose={() => setIsFailedModalOpen(false)}
        message={modalMessage}
      />
    </>
  );
}
