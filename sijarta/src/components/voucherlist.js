"use client";

import { useState } from 'react';
import SuccessModal from './successmodal';
import FailedModal from './failedmodal';

export default function VoucherList({ vouchers }) {
  if (!vouchers || vouchers.length === 0) {
    return <p>No vouchers available</p>; // Menampilkan pesan jika data kosong
  }

  const [userBalance, setUserBalance] = useState(8000);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isFailedModalOpen, setIsFailedModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [selectedPaymentMethods, setSelectedPaymentMethods] = useState({});

  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedVoucher, setSelectedVoucher] = useState(null); // Menyimpan voucher yang dipilih

  const handleBuyVoucher = (voucher) => {
    setSelectedVoucher(voucher);
    setIsPaymentModalOpen(true); // Membuka modal pembayaran
  };

  const handlePaymentMethodChange = (method) => {
    setSelectedPaymentMethods((prev) => ({
      ...prev,
      [selectedVoucher.kode]: method,
    }));
  };

  const handleConfirmPurchase = () => {
    const paymentMethod = selectedPaymentMethods[selectedVoucher.kode] || 'Metode'; // Default jika belum dipilih

    if (paymentMethod === 'Metode') {
      alert('Harap pilih metode pembayaran');
      return;
    }

    if (paymentMethod === 'MyPay') {
      if (userBalance >= selectedVoucher.harga) {
        // Jika cukup, kurangi saldo dan tampilkan pesan sukses
        setUserBalance(userBalance - selectedVoucher.harga);
        setModalMessage(
          `Selamat! Anda berhasil membeli voucher kode ${selectedVoucher.kode}. Voucher ini berlaku hingga ${selectedVoucher.berlaku} dengan kuota penggunaan sebanyak ${selectedVoucher.kuota} kali.`
        );
        setIsSuccessModalOpen(true);
      } else {
        // Jika tidak cukup, tampilkan pesan gagal
        setModalMessage('Maaf, saldo Anda tidak cukup untuk membeli voucher ini.');
        setIsFailedModalOpen(true);
      }
    } else {
      // Jika metode pembayaran selain MyPay, langsung berhasil
      setModalMessage(
        `Selamat! Anda berhasil membeli voucher kode ${selectedVoucher.kode} dengan metode pembayaran ${paymentMethod}. Voucher ini berlaku hingga ${selectedVoucher.berlaku} dengan kuota penggunaan sebanyak ${selectedVoucher.kuota} kali.`
      );
      setIsSuccessModalOpen(true);
    }

    setIsPaymentModalOpen(false); // Menutup modal pembayaran setelah konfirmasi
  };

  return (
    <>
      <div className="space-y-4">
        {vouchers.map((voucher, index) => (
          <div
            key={index}
            className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr_1fr_1fr_1fr_auto_auto] gap-4 items-center bg-gray-50 p-4 rounded-lg shadow-md"
          >
            <p className="text-center">{voucher.kode}</p>
            <p className="text-center">{voucher.potongan}</p>
            <p className="text-center">{voucher.minTransaksi}</p>
            <p className="text-center">{voucher.berlaku}</p>
            <p className="text-center">{voucher.kuota}</p>
            <p className="text-center">{voucher.harga}</p>

            {/* Tombol Beli */}
            <button
              className="bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-600"
              onClick={() => handleBuyVoucher(voucher)}
            >
              Beli
            </button>
          </div>
        ))}
      </div>

      {/* Modal Pemilihan Metode Pembayaran */}
      {isPaymentModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-md w-96">
            <h2 className="text-2xl font-semibold mb-4 text-center">Pilih Metode Pembayaran</h2>
            
            <select
              className="border rounded px-2 py-1 mb-4 w-full"
              value={selectedPaymentMethods[selectedVoucher?.kode] || ''}
              onChange={(e) => handlePaymentMethodChange(e.target.value)}
            >
              <option value="">Metode</option>
              <option value="MyPay">MyPay</option>
              <option value="Credit Card">Credit Card</option>
              <option value="Bank Transfer">Bank Transfer</option>
            </select>
            
            <div className="flex justify-between">
              <button
                className="bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-600"
                onClick={handleConfirmPurchase}
              >
                Beli
              </button>
              <button
                className="bg-gray-500 text-white py-1 px-4 rounded hover:bg-gray-600"
                onClick={() => setIsPaymentModalOpen(false)}
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      )}

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
