"use client";

const vouchers = [
  { kode: 'VCR10', potongan: '10%', minTransaksi: 'Rp100,000', berlaku: '7 Hari', kuota: 50, harga: 'Rp5,000' },
  { kode: 'VCR20', potongan: '20%', minTransaksi: 'Rp200,000', berlaku: '10 Hari', kuota: 30, harga: 'Rp10,000' },
];

export default function VoucherList() {
  return (
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
          <button className="bg-blue-500 text-white py-1 px-4 rounded">Beli</button>
        </div>
      ))}
    </div>
  );
}
